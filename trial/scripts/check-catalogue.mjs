import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const { chromium } = await import('playwright');
const contract = JSON.parse(await readFile('ai/contract.json', 'utf8'));
const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const output = '.review/catalogue';
await mkdir(output, { recursive: true });
// Test a real static build under a non-root base by default.
const root = resolve('reference/dist');
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!path.startsWith('/reference/')) { res.writeHead(404).end(); return; }
  const file = resolve(root, path.slice('/reference/'.length) || 'index.html');
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const data = await readFile(file);
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' })[extname(file)] ?? 'text/plain');
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const base = process.env.REFERENCE_URL ?? `http://127.0.0.1:${server.address().port}/reference/`;
const url = new URL(base.endsWith('/') ? base : `${base}/`);
url.search = '?view=catalogue';
const browser = await chromium.launch();
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url.href);
  await page.getByRole('heading', { name: 'Component catalogue', exact: true }).waitFor();
  const nav = page.getByRole('navigation', { name: 'Components', exact: true });
  assert.equal(await nav.getByRole('link').count(), 42);
  await page.getByLabel('Search components', { exact: true }).fill('date');
  assert.equal(await nav.getByRole('link').count(), 4);
  await page.getByLabel('Component category').selectOption('Actions');
  await page.getByText('No components found', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  assert.equal(await nav.getByRole('link').count(), 42);
  await nav.getByRole('link', { name: 'Checkbox', exact: true }).focus();
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).searchParams.get('component'), 'Checkbox');
  await page.getByRole('checkbox', { name: 'Include archived projects' }).click();
  assert.equal(await page.getByRole('checkbox').isChecked(), true);
  await page.reload();
  await page.getByRole('heading', { name: 'Checkbox', exact: true }).waitFor();
  await nav.getByRole('link', { name: 'Button', exact: true }).click();
  await page.goBack();
  await page.getByRole('heading', { name: 'Checkbox', exact: true }).waitFor();
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('denied')) } }));
  await page.getByRole('button', { name: 'Copy example', exact: true }).click();
  await page.getByText('Automatic copy is unavailable.', { exact: false }).waitFor();
  assert.ok(await page.evaluate(() => window.getSelection().toString().includes('export function Checkbox')));
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: text => { window.copied = text; return Promise.resolve(); } } }));
  await page.getByRole('button', { name: 'Copy example', exact: true }).click();
  assert.ok(await page.evaluate(() => window.copied.includes('export function Checkbox')));
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click();
    for (const name of contract.components) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await nav.getByRole('link', { name, exact: true }).click();
      const preview = page.getByRole('region', { name: `${name} live preview`, exact: true });
      await preview.waitFor();
      assert.ok((await page.getByLabel('Example', { exact: true }).textContent()).includes(`export function ${name}()`));
      await page.locator('.catalogue-api').evaluate(el => { el.open = true; });
      for (const label of ['Download API types', 'Read implementation source']) {
        const href = await page.getByRole('link', { name: label, exact: true }).getAttribute('href');
        const response = await page.request.get(new URL(href, page.url()).href);
        assert.equal(response.status(), 200, `${name}/${label}`);
        assert.ok(!(await response.text()).includes('<!doctype html>'));
      }
      await page.locator('.catalogue-api').evaluate(el => { el.open = false; });
      await page.addScriptTag({ content: axe });
      const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [], `${name}/${theme} axe`);
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}/${theme}/${width} overflow`);
      }
      results.push({ component: name, theme, axeViolations: 0, widthsWithoutOverflow: [1440, 390, 320] });
    }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await nav.getByRole('link', { name: 'Button', exact: true }).click();
      if (width < 650) await page.waitForFunction(() => document.activeElement.id === 'catalogue-content');
      await page.addScriptTag({ content: axe });
      const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
      assert.deepEqual(audit.violations.map(v => v.id), [], `${theme}/${width} axe`);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => { window.getSelection()?.removeAllRanges(); window.scrollTo(0, 0); });
      await page.screenshot({ path: `${output}/${theme}-${width}.png`, fullPage: true });
    }
  }
  for (const label of ['Foundation reference', 'AI reference', 'Accessibility notes', 'All theme tokens', 'Agent instructions', 'Composition recipes', 'Workflow source recipes']) {
    const href = await page.getByRole('link', { name: label, exact: true }).getAttribute('href');
    const response = await page.request.get(new URL(href, page.url()).href);
    assert.equal(response.status(), 200, label);
  }
  await page.getByLabel('Search components', { exact: true }).fill('button');
  assert.equal(await page.getByLabel('Search components', { exact: true }).evaluate(el => el === document.activeElement), true);
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify({ date: new Date().toISOString(), base, results, browserErrors: errors, search: true, recovery: true, keyboard: true, copyFallback: true, assets: true }, null, 2));
  console.log(`Catalogue passed: ${results.length} component/theme audits; all previews at 1440/390/320; search, recovery, history, keyboard, clipboard, static assets.`);
} finally { await browser.close(); await new Promise(done => server.close(done)); }
