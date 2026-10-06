import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { root, trial, runPath } from './paths.mjs';
import { serve } from './server.mjs';

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(trial, '.playwright');
const { chromium } = await import('playwright');

const id = process.argv[2];
const dir = runPath(id);
const out = resolve(root, 'evidence-confirmation', id);
const primaryOut = resolve(root, 'evidence', id);
const verifierPath = fileURLToPath(import.meta.url);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const fileHash = async path => sha256(await readFile(path));

await mkdir(resolve(out, 'screenshots'), { recursive: true });

const manifest = JSON.parse(await readFile(resolve(dir, 'manifest.json'), 'utf8'));
const checkedBytes = await readFile(resolve(primaryOut, 'check.json'));
const checked = JSON.parse(checkedBytes.toString('utf8'));
const sourceHashes = {};
const sourceParts = [];
for (const file of ['App.tsx', 'app.css', 'prompt.txt']) {
  const bytes = await readFile(resolve(dir, file));
  sourceHashes[file] = sha256(bytes);
  sourceParts.push(Buffer.from(`${file}\0`), bytes, Buffer.from('\0'));
}
const provenance = {
  confirmedAt: new Date().toISOString(),
  verifierSha256: await fileHash(verifierPath),
  checkReportSha256: sha256(checkedBytes),
  sourceHashes,
  sourceAndPromptSha256: sha256(Buffer.concat(sourceParts)),
  tools: {
    node: process.version,
    playwright: JSON.parse(await readFile(resolve(trial, 'node_modules/playwright/package.json'), 'utf8')).version,
    'source-map-js': JSON.parse(await readFile(resolve(trial, 'node_modules/source-map-js/package.json'), 'utf8')).version,
  },
};

const hashMismatches = Object.entries(sourceHashes)
  .filter(([file, hash]) => checked.hashes?.[file] !== hash)
  .map(([file, actual]) => ({ file, expected: checked.hashes?.[file] ?? null, actual }));

async function writeResult(result) {
  await writeFile(resolve(out, 'browser.json'), JSON.stringify({ id, ...result, provenance }, null, 2));
}

if (hashMismatches.length) {
  await writeResult({ status: 'blocked', reason: 'Candidate source or prompt no longer matches the primary check report.', hashMismatches });
  console.error(JSON.stringify({ id, status: 'blocked', hashMismatches }));
  process.exitCode = 1;
} else if (checked.build || checked.typecheck) {
  await writeResult({ status: 'blocked', reason: 'Build or typecheck failed in the primary check report.' });
  console.log(JSON.stringify({ id, status: 'blocked' }));
} else {
  let server;
  let browser;
  const results = [];
  const axe = await readFile(resolve(trial, 'node_modules/axe-core/axe.min.js'), 'utf8');

  const button = (page, name) => page.getByRole('button', { name, exact: true });
  const journal = page => page.evaluate(() => window.__evaluationJournal);
  const prefix = label => new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\b|\\s|$)`);

  async function scenario(name, fn) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(2500);
    try {
      await page.goto(`${url}/${id}/`);
      await page.waitForFunction(() => document.getElementById('root')?.childElementCount > 0);
      await fn(page);
      results.push({ name, status: 'pass' });
    } catch (error) {
      results.push({ name, status: 'fail', message: error.message });
      await page.screenshot({ path: resolve(out, 'screenshots', `${name}-failure.png`), fullPage: true }).catch(() => {});
    } finally {
      await page.close().catch(() => {});
    }
  }

  async function select(page, label, value) {
    const control = page.getByRole('combobox', { name: prefix(label) });
    if (await control.evaluate(element => element.tagName === 'SELECT')) {
      await control.selectOption({ label: value });
    } else {
      await control.click();
      await page.getByRole('option', { name: value, exact: true }).click();
    }
  }

  function checkbox(page, label) {
    return page.getByRole('checkbox', { name: prefix(label) });
  }

  async function setCheckbox(page, label, checked) {
    const control = checkbox(page, label);
    if (await control.isChecked() !== checked) await control.press('Space');
    assert.equal(await control.isChecked(), checked);
  }

  async function continueOnboarding(page) {
    const action = page.getByRole('button', { name: /^(?:Continue|Review setup)(?:\b|\s|$)/ });
    assert.equal(await action.count(), 1, 'Expected one onboarding forward action.');
    await action.click();
  }

  async function clickFirstEnabledVisible(locator) {
    const count = await locator.count();
    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      if (await candidate.isVisible() && await candidate.isEnabled()) {
        await candidate.click();
        return;
      }
    }
    assert.fail('No visible, enabled matching action was found.');
  }

  async function expectFocus(locator) {
    const focused = await locator.evaluate(element => new Promise(resolveFocus => {
      let frames = 0;
      const poll = () => {
        if (document.activeElement === element) return resolveFocus(true);
        frames += 1;
        if (frames >= 30) return resolveFocus(false);
        requestAnimationFrame(poll);
      };
      poll();
    }));
    assert.equal(focused, true, 'Expected focus did not arrive within 30 animation frames.');
  }

  async function settled(page) {
    await page.waitForFunction(() => window.__evaluationJournal.length > 0
      && window.__evaluationJournal.at(-1).outcome !== 'pending');
  }

  async function saveRetry(page, first, retry, operation) {
    await button(page, first).click();
    await settled(page);
    let entries = await journal(page);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].outcome, 'rejected');
    assert.equal(entries[0].operation, operation);
    await page.screenshot({ path: resolve(out, 'screenshots', 'error-state.png'), fullPage: true });
    await button(page, retry).click();
    await settled(page);
    entries = await journal(page);
    assert.equal(entries.length, 2);
    assert.equal(entries[1].outcome, 'resolved');
    await page.screenshot({ path: resolve(out, 'screenshots', 'success-state.png'), fullPage: true });
    return entries[1].input;
  }

  let url;
  try {
    ({ server, url } = await serve());
    browser = await chromium.launch();

    if (manifest.task === 'invoices') {
      await scenario('invoice-filter-recovery', async page => {
        assert.equal(await page.getByRole('button', { name: /^Review INV-/ }).count(), 6);
        for (const total of ['4,075.50', '5,800.00', '3,140.00']) assert.ok((await page.locator('body').innerText()).includes(total));
        await page.getByLabel('Search invoices', { exact: true }).fill('CEDAR');
        await select(page, 'Invoice status', 'Overdue');
        assert.equal(await page.getByRole('button', { name: /^Review INV-/ }).count(), 1);
        await page.getByLabel('Search invoices', { exact: true }).fill('unfindable');
        assert.equal(await page.getByRole('button', { name: /^Review INV-/ }).count(), 0);
        await clickFirstEnabledVisible(button(page, 'Clear filters'));
        assert.equal(await page.getByRole('button', { name: /^Review INV-/ }).count(), 6);
      });
      await scenario('invoice-detail-recovery', async page => {
        await button(page, 'Review INV-2101').click();
        assert.ok((await page.locator('body').innerText()).includes('accounts@cedar.example'));
        assert.equal(await saveRetry(page, 'Send demo reminder', 'Retry demo reminder', 'remindInvoice'), 'INV-2101');
        await button(page, 'Close details').click();
        await expectFocus(button(page, 'Review INV-2101'));
        await button(page, 'Review INV-2105').click();
        assert.equal(await button(page, 'Send demo reminder').count(), 0);
      });
    } else if (manifest.task === 'settings') {
      await scenario('settings-empty-validation', async page => {
        const field = page.getByLabel('Display name', { exact: true });
        assert.equal(await field.inputValue(), 'Sam Rivera');
        await field.fill('');
        await button(page, 'Save settings').click();
        assert.equal((await journal(page)).length, 0);
        await expectFocus(field);
      });
      await scenario('settings-maximum-validation', async page => {
        const field = page.getByLabel('Display name', { exact: true });
        await field.fill('x'.repeat(61));
        const stored = await field.inputValue();
        if (stored.length <= 60) {
          assert.equal((await journal(page)).length, 0);
        } else {
          await button(page, 'Save settings').click();
          assert.equal((await journal(page)).length, 0);
          await expectFocus(field);
        }
      });
      await scenario('settings-save-reset', async page => {
        const field = page.getByLabel('Display name', { exact: true });
        await field.fill('Changed');
        await button(page, 'Reset changes').click();
        assert.equal(await field.inputValue(), 'Sam Rivera');
        await field.fill('  Avery Chen  ');
        await select(page, 'Time zone', 'Europe/London');
        await select(page, 'Digest frequency', 'Daily');
        await setCheckbox(page, 'Product updates', true);
        const saved = await saveRetry(page, 'Save settings', 'Retry save', 'saveSettings');
        assert.deepEqual(saved, { displayName: 'Avery Chen', timezone: 'Europe/London', digest: 'Daily', productUpdates: true });
        assert.equal((await field.inputValue()).trim(), 'Avery Chen');
        await field.fill('Other');
        await button(page, 'Reset changes').click();
        assert.equal(await field.inputValue(), 'Avery Chen');
      });
    } else {
      await scenario('onboarding-validation', async page => {
        await continueOnboarding(page);
        assert.equal((await journal(page)).length, 0);
        await expectFocus(page.getByLabel('Studio name', { exact: true }));
      });
      await scenario('onboarding-completion', async page => {
        await page.getByLabel('Studio name', { exact: true }).fill('  Orbit Studio  ');
        await select(page, 'Work type', 'Research');
        await continueOnboarding(page);
        await setCheckbox(page, 'Weekly summary', false);
        await button(page, 'Back').click();
        assert.equal((await page.getByLabel('Studio name', { exact: true }).inputValue()).trim(), 'Orbit Studio');
        await continueOnboarding(page);
        assert.equal(await checkbox(page, 'Weekly summary').isChecked(), false);
        await continueOnboarding(page);
        const bodyText = await page.locator('body').innerText();
        assert.ok(bodyText.includes('Orbit Studio') && bodyText.includes('Research'));
        await page.screenshot({ path: resolve(out, 'screenshots', 'review-state.png'), fullPage: true });
        assert.deepEqual(await saveRetry(page, 'Finish demo setup', 'Retry completion', 'finishSetup'), { studioName: 'Orbit Studio', workType: 'Research', digest: false });
        await button(page, 'Restart setup').click();
        assert.equal(await page.getByLabel('Studio name', { exact: true }).inputValue(), '');
      });
    }

    for (const theme of ['light', 'dark']) {
      for (const width of [1280, 320]) {
        await scenario(`render-${theme}-${width}`, async page => {
          const errors = [];
          page.on('pageerror', error => errors.push(error.message));
          await page.setViewportSize({ width, height: 900 });
          await page.goto(`${url}/${id}/?theme=${theme}`);
          await page.waitForFunction(() => document.getElementById('root')?.childElementCount > 0);
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: resolve(out, 'screenshots', `${theme}-${width}.png`), fullPage: true });
          await page.addScriptTag({ content: axe });
          const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
          await writeFile(resolve(out, `axe-${theme}-${width}.json`), JSON.stringify(audit.violations, null, 2));
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Page overflow');
          assert.deepEqual(errors, [], 'Runtime errors');
          await page.keyboard.press('Tab');
          assert.ok(await page.evaluate(() => document.activeElement !== document.body), 'Keyboard focus did not enter interface');
          assert.equal(audit.violations.length, 0, `axe violations: ${audit.violations.map(violation => violation.id).join(', ')}`);
        });
      }
    }

    await writeResult({
      status: 'measured',
      checks: results,
      limitations: [
        'Automated checks are partial evidence, not human review or accessibility conformance.',
        'Error/success screenshots use desktop light; initial render includes both widths/themes.',
        'This supplemental run reuses the existing built candidate outputs and does not attest their original build-time dependency versions.',
      ],
    });
    console.log(JSON.stringify(results));
    process.exitCode = results.some(result => result.status === 'fail') ? 1 : 0;
  } catch (error) {
    await writeResult({ status: 'blocked', reason: `Confirmation harness setup failed: ${error.message}`, checks: results });
    console.error(error.stack || String(error));
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (server) await new Promise(done => server.close(done));
  }
}
