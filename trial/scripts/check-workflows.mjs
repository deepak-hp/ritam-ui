import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const playwright = await import('playwright');

const browserName = process.env.BROWSER ?? 'chromium';
const supportedBrowsers = ['chromium', 'firefox', 'webkit'];
if (!supportedBrowsers.includes(browserName)) {
 throw new Error(`Unsupported BROWSER=${browserName}. Expected one of: ${supportedBrowsers.join(', ')}`);
}
const browserType = playwright[browserName];

const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const output = browserName === 'chromium' ? '.review/workflows' : `.review/workflows/${browserName}`;
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
let browser;
const results = [];
const stateResults = [];
const textSpacingResults = [];
const keyboardResults = [];
const spacing = '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }';
try {
 browser = await browserType.launch();
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
 const errors = []; page.on('pageerror', e => errors.push(e.message));
 const button = name => page.getByRole('button', { name, exact: true });
 const alert = text => page.getByRole('alert').filter({ hasText: text }).waitFor();
 async function auditState(label) {
  for (const theme of ['light', 'dark']) {
   if (await page.evaluate(() => document.documentElement.dataset.dpTheme) !== theme) await button(`Use ${theme} theme`).click();
   await page.addScriptTag({ content: axe });
   const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
   assert.deepEqual(audit.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [], `${label}/${theme} axe`);
   assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${label}/${theme} overflow`);
   await page.evaluate(() => window.scrollTo(0, 0));
   await page.screenshot({ path: `${output}/${label}-${theme}-320.png`, fullPage: true });
   stateResults.push({ state: label, theme, width: 320, axeViolations: 0, overflow: false });
  }
 }
 async function route(name) { await page.goto(url.href); await page.getByRole('link', { name, exact: true }).click(); assert.equal(new URL(page.url()).pathname, '/reference/'); await page.locator('.workflow').waitFor(); }
 async function tabTo(target, context) {
  for (let i = 0; i < 50; i++) {
   if (await target.evaluate(el => el === document.activeElement)) {
    const visible = await target.evaluate(el => {
     const rect = el.getBoundingClientRect();
     return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0;
    });
    assert.ok(visible, `${context}: focused control is obscured`);
    return;
   }
   await page.keyboard.press('Tab');
  }
  throw new Error(`${context}: target was not reachable with Tab`);
 }
 for (const theme of ['light', 'dark']) for (const name of ['Invoices', 'Settings', 'Onboarding']) {
  await route(name); if (theme === 'dark') await button('Use dark theme').click();
  for (const width of [1440, 390, 320]) {
   await page.setViewportSize({ width, height: 1000 });
   assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}/${theme}/${width} overflow`);
   await page.addScriptTag({ content: axe });
   const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
   assert.deepEqual(audit.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [], `${name}/${theme}/${width} axe`);
   await page.evaluate(() => document.fonts.ready);
   await page.screenshot({ path: `${output}/${name.toLowerCase()}-${theme}-${width}.png`, fullPage: true });
   results.push({ route: name, theme, width, axeViolations: 0, overflow: false });
  }
 }
 for (const name of ['Invoices', 'Settings', 'Onboarding']) {
  await route(name);
  await page.setViewportSize({ width: 320, height: 640 });
  await page.addStyleTag({ content: spacing });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}/text-spacing overflow`);
  await page.screenshot({ path: `${output}/${name.toLowerCase()}-text-spacing-320.png`, fullPage: true });
  textSpacingResults.push({ route: name, width: 320, overflow: false });

  await route(name);
  await page.setViewportSize({ width: 1280, height: 800 });
  if (name === 'Invoices') {
   const search = page.getByLabel('Search invoices');
   await tabTo(search, `${name} search`);
   await page.keyboard.insertText('no-client');
   await page.getByText('No matching invoices', { exact: true }).waitFor();
   const reset = button('Reset filters');
   await tabTo(reset, `${name} reset`);
   await page.keyboard.press('Enter');
   await page.getByText('No matching invoices', { exact: true }).waitFor({ state: 'hidden' });
  } else if (name === 'Settings') {
   const displayName = page.getByLabel('Display name');
   await tabTo(displayName, `${name} display name`);
   await page.keyboard.press('ControlOrMeta+A');
   await page.keyboard.insertText(' ');
   await tabTo(button('Save settings'), `${name} save`);
   await page.keyboard.press('Enter');
   await page.waitForFunction(() => document.activeElement?.id === 'settings-name');
  } else {
   await tabTo(button('Continue'), `${name} continue`);
   await page.keyboard.press('Enter');
   await page.waitForFunction(() => document.activeElement?.id === 'workspace-name');
  }
  keyboardResults.push({ route: name, keyboardPath: true, focusVisibleInViewport: true });
 }
 await route('Invoices'); await page.getByLabel('Search invoices').fill('no-client');
 await page.getByText('No matching invoices', { exact: true }).waitFor(); await button('Reset filters').click();
 await page.getByRole('combobox', { name: 'Invoice status' }).click(); await page.getByRole('option', { name: 'Paid', exact: true }).click(); assert.equal(await button('INV-1044').count(), 1);
 await button('INV-1044').click(); await page.getByText('This invoice is paid. No reminder is needed.').waitFor(); await button('Close details').click();
 await page.getByRole('combobox', { name: 'Invoice status' }).click(); await page.getByRole('option', { name: 'All', exact: true }).click(); await button('INV-1042').focus(); await page.keyboard.press('Enter');
 await page.waitForFunction(() => document.activeElement.id === 'invoice-detail-heading');
 await page.getByRole('checkbox', { name: 'Fail the next reminder' }).click(); await button('Simulate reminder').click();
 assert.equal(await button('Simulate reminder').isDisabled(), true); await alert('simulation failed'); await auditState('reminder-error'); await button('Retry reminder').click();
 await page.getByText('Reminder simulation complete. No email was sent.').waitFor(); assert.equal(await button('Reminder simulated').isDisabled(), true);
 await button('Close details').click(); await page.waitForFunction(() => document.activeElement.textContent.trim() === 'INV-1042');
 await route('Settings'); await page.getByLabel('Display name').fill(' '); await button('Save settings').click();
 await page.waitForFunction(() => document.activeElement.id === 'settings-name'); await page.getByText('Enter a name.', { exact: true }).waitFor();
 await page.getByLabel('Display name').fill('Updated Person'); await page.getByRole('combobox', { name: 'Time zone' }).click(); await page.getByRole('option', { name: 'Europe/London', exact: true }).click();
 await page.getByText('Try a save failure', { exact: true }).click(); await page.getByRole('checkbox', { name: 'Fail the next save' }).click(); await button('Save settings').click();
 assert.equal(await page.getByLabel('Display name').isDisabled(), true); await alert('Settings were not saved'); await auditState('settings-error'); assert.equal(await page.getByLabel('Display name').inputValue(), 'Updated Person');
  await page.evaluate(() => { const original = Storage.prototype.setItem; window.saveCalls = 0; Storage.prototype.setItem = function(...args) { window.saveCalls++; return original.apply(this, args); }; document.querySelector('form').requestSubmit(); document.querySelector('form').requestSubmit(); });
 await page.getByText('Settings saved in this browser.').waitFor(); assert.equal(await page.evaluate(() => window.saveCalls), 1); await page.reload();
 assert.equal(await page.getByLabel('Display name').inputValue(), 'Updated Person'); assert.ok((await page.getByRole('combobox', { name: 'Time zone' }).textContent()).includes('Europe/London'));
 await page.getByLabel('Display name').fill('Discard me'); await button('Reset changes').click(); assert.equal(await page.getByLabel('Display name').inputValue(), 'Updated Person');
 await page.evaluate(() => { window.originalSetItem = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new Error('quota'); }; });
 await page.getByLabel('Display name').fill('Kept after actual failure'); await button('Save settings').click(); await alert('Settings were not saved');
 assert.equal(await page.getByLabel('Display name').inputValue(), 'Kept after actual failure');
 await page.evaluate(() => { Storage.prototype.setItem = window.originalSetItem; }); await button('Retry save').click(); await page.getByText('Settings saved in this browser.').waitFor();
 await page.evaluate(() => localStorage.setItem('ritam-ui.examples.settings', '{bad')); await page.reload(); await alert('Saved data could not be read');
 assert.equal(await button('Save settings').isDisabled(), true); assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.settings')), '{bad');
 await button('Allow replacement on next save').focus(); await page.keyboard.press('Enter'); await page.waitForFunction(() => document.activeElement.id === 'settings-name'); assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.settings')), '{bad'); await button('Save settings').click(); await page.getByText('Settings saved in this browser.').waitFor();
 await route('Onboarding'); await button('Continue').click(); await page.waitForFunction(() => document.activeElement.id === 'workspace-name');
 await page.getByLabel('Workspace name').fill('Cedar Studio'); await page.keyboard.press('Enter'); await page.waitForFunction(() => document.activeElement.id === 'onboarding-step');
 await page.getByRole('checkbox', { name: 'Weekly workspace summary' }).click(); await button('Back').click(); assert.equal(await page.getByLabel('Workspace name').inputValue(), 'Cedar Studio');
 await button('Continue').click(); assert.equal(await page.getByRole('checkbox', { name: 'Weekly workspace summary' }).isChecked(), false); await button('Continue').click();
 await page.getByText('Try a completion failure', { exact: true }).click(); await page.getByRole('checkbox', { name: 'Fail the next completion' }).click(); await button('Finish local setup').click();
 assert.equal(await button('Back').isDisabled(), true); await alert('Setup was not saved'); await auditState('onboarding-error'); await button('Retry completion').click();
 await page.getByRole('heading', { name: 'Cedar Studio is ready to explore' }).waitFor(); await page.reload(); await page.getByRole('heading', { name: 'Cedar Studio is ready to explore' }).waitFor();
 await button('Restart setup').click(); assert.equal(await page.getByLabel('Workspace name').inputValue(), ''); assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.onboarding')), null);
 await page.evaluate(() => localStorage.setItem('ritam-ui.examples.onboarding', '{bad')); await page.reload(); await alert('Saved data could not be read');
 assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.onboarding')), '{bad'); await button('Allow replacement on next save').focus(); await page.keyboard.press('Enter'); await page.waitForFunction(() => document.activeElement.id === 'workspace-name'); assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.onboarding')), '{bad');
 await page.getByLabel('Workspace name').fill('Recovered'); await button('Continue').click(); await button('Continue').click();
 await page.evaluate(() => { window.originalSetItem = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new Error('quota'); }; });
 await button('Finish local setup').click(); await alert('Setup was not saved'); assert.equal(await page.evaluate(() => localStorage.getItem('ritam-ui.examples.onboarding')), '{bad'); await page.evaluate(() => { Storage.prototype.setItem = window.originalSetItem; }); await button('Retry completion').click();
 await page.getByRole('heading', { name: 'Recovered is ready to explore' }).waitFor(); await auditState('onboarding-complete');
 assert.deepEqual(errors, []);
 await writeFile(`${output}/results.json`, JSON.stringify({ date: new Date().toISOString(), browser: browserName, base, results, stateResults, textSpacingResults, keyboardResults, browserErrors: errors, completeFlows: true, recovery: true, keyboard: true, actualStorageFailure: true, corruptionRecovery: true }, null, 2));
 console.log(`${browserName}: workflows passed: 18 route/theme/viewport and 8 additional state/theme axe and overflow audits; text spacing and keyboard paths for 3 complete routes; catalogue navigation; invoice filters/reminders; settings persistence/reset; onboarding back/completion/restart; validation/focus; simulated and actual failures; corrupt-storage recovery.`);
} finally {
 await browser?.close();
 if (server.listening) await new Promise(done => server.close(done));
}
