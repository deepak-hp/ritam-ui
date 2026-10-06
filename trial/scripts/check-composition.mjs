import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const base = process.env.REFERENCE_URL ?? 'http://127.0.0.1:5174';
const output = '.review/composition';
await mkdir(output, { recursive: true });
const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const results = [];

try {
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/?view=composition`);
    await page.getByRole('heading', { name: 'Composition lab', exact: true }).waitFor();
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    for (const version of ['A', 'B']) {
      await page.getByRole('radio', { name: `Version ${version}`, exact: true }).click();
      const screen = page.getByRole('region', { name: `Version ${version}`, exact: true });
      await screen.getByRole('heading', { name: 'Invoices', exact: true }).waitFor();
      assert.equal(await screen.getByRole('button', { name: /^Review INV-/ }).count(), 5);
      await screen.getByLabel('Search invoices', { exact: true }).fill('Kaveri');
      assert.equal(await screen.getByRole('button', { name: /^Review INV-/ }).count(), 1);
      await screen.getByRole('button', { name: 'Review INV-1042' }).click();
      const detail = page.getByRole('region', { name: 'Invoice INV-1042', exact: true });
      await detail.waitFor();
      assert.ok(await detail.evaluate(el => el === document.activeElement), 'Review focuses details');
      assert.ok((await detail.innerText()).includes('Kaveri Studio'));
      await detail.getByRole('button', { name: 'Close details' }).click();
      assert.ok(await screen.getByRole('button', { name: 'Review INV-1042' }).evaluate(el => el === document.activeElement));
      await screen.getByLabel('Search invoices', { exact: true }).fill('not-found');
      await screen.getByText('No invoices match your filters.', { exact: true }).waitFor();
      await screen.getByRole('button', { name: 'Clear filters' }).click();
      await screen.getByRole('combobox', { name: 'Invoice status', exact: true }).click();
      await page.getByRole('option', { name: 'Overdue', exact: true }).click();
      assert.equal(await screen.getByRole('button', { name: /^Review INV-/ }).count(), 2);
      await screen.getByRole('button', { name: 'Clear filters' }).click();
      for (const width of [1440, 615, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => document.fonts.ready);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${version}/${theme}/${width} page overflows`);
        await page.addScriptTag({ content: axe });
        const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${version}/${theme}/${width} accessibility`);
        if ([1440, 390].includes(width)) {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: `${output}/${version.toLowerCase()}-${theme}-${width}.png`, fullPage: true });
        }
        results.push({ version, theme, width, overflow: false, axeViolations: 0 });
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('radio', { name: 'Side by side' }).click();
    for (const width of [1440, 615, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `pair/${width} page overflow`);
    }
    const first = page.getByRole('region', { name: 'Version A', exact: true });
    const second = page.getByRole('region', { name: 'Version B', exact: true });
    await first.getByLabel('Search invoices', { exact: true }).fill('Fieldwork');
    assert.equal(await second.getByLabel('Search invoices', { exact: true }).inputValue(), 'Fieldwork');
    for (const screen of [first, second]) {
      assert.equal(await screen.getByRole('button', { name: /^Review INV-/ }).count(), 1);
      assert.equal(await screen.getByRole('button', { name: 'Review INV-1043' }).count(), 1);
    }
    await second.getByRole('button', { name: 'Clear filters' }).click();
    for (const screen of [first, second]) assert.equal(await screen.getByRole('button', { name: /^Review INV-/ }).count(), 5);
    await page.addScriptTag({ content: axe });
    const pairAudit = await page.evaluate(() => window.axe.run(document));
    assert.deepEqual(pairAudit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], 'Pair accessibility');
    assert.deepEqual(errors, [], 'Browser errors');
    await page.close();
  }
  const keyboard = await browser.newPage({ viewport: { width: 615, height: 900 }, forcedColors: 'active' });
  await keyboard.goto(`${base}/?view=composition`);
  await keyboard.getByRole('heading', { name: 'Composition lab', exact: true }).waitFor();
  await keyboard.keyboard.press('Tab');
  assert.equal(await keyboard.evaluate(() => document.activeElement?.textContent), 'Skip to comparison');
  await keyboard.keyboard.press('Enter');
  assert.equal(await keyboard.evaluate(() => document.activeElement?.id), 'comparison-content');
  await keyboard.getByRole('radio', { name: 'Version A', exact: true }).focus();
  await keyboard.keyboard.press('ArrowDown');
  await keyboard.getByRole('region', { name: 'Version B', exact: true }).waitFor();
  await keyboard.getByRole('button', { name: 'Review INV-1042' }).focus();
  await keyboard.keyboard.press('Enter');
  await keyboard.getByRole('region', { name: 'Invoice INV-1042', exact: true }).waitFor();
  await keyboard.keyboard.press('Tab');
  assert.equal(await keyboard.evaluate(() => document.activeElement?.textContent?.trim()), 'Close details');
  await keyboard.keyboard.press('Enter');
  assert.equal(await keyboard.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Review INV-1042');
  await keyboard.close();
  await writeFile(`${output}/results.json`, JSON.stringify({ cases: results, interactions: 'search, status, empty, reset, shared state, review, focus return, keyboard, forced-colors smoke' }, null, 2));
  console.log(`Composition: ${results.length} theme/layout/width cases; shared interactions, accessibility, reflow and keyboard passed.`);
} finally {
  await browser.close();
}
