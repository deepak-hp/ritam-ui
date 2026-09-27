import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const base = process.env.REFERENCE_URL ?? 'http://127.0.0.1:5174';
const output = '.review/reference-accessibility';
await mkdir(output, { recursive: true });
const failures = [];
const results = [];
const spacing = '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }';

async function checkFocus(page, context) {
  const state = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { ok: false, name: 'body' };
    const r = el.getBoundingClientRect();
    const x1 = Math.max(0, r.left), x2 = Math.min(innerWidth, r.right);
    const y1 = Math.max(0, r.top), y2 = Math.min(innerHeight, r.bottom);
    if (x2 <= x1 || y2 <= y1) return { ok: false, name: el.getAttribute('aria-label') || el.textContent };
    const top = document.elementFromPoint((x1 + x2) / 2, (y1 + y2) / 2);
    return { ok: el === top || el.contains(top), name: el.getAttribute('aria-label') || el.textContent || el.tagName };
  });
  assert.ok(state.ok, `${context}: focused control obscured: ${state.name}`);
}

async function tabTo(page, target) {
  for (let i = 0; i < 65; i++) {
    if (await target.evaluate(el => el === document.activeElement)) {
      await checkFocus(page, 'Keyboard workflow');
      return;
    }
    await page.keyboard.press('Tab');
  }
  throw new Error(`Could not reach ${await target.textContent()} with Tab`);
}

try {
  for (const scenario of [
    { name: 'reflow-320', width: 320, height: 256 },
    { name: 'text-spacing', width: 320, height: 640, spacing: true },
    { name: 'text-enlargement-200', width: 640, height: 800, enlarge: true },
    { name: 'forced-colors', width: 390, height: 700, forcedColors: 'active' },
  ]) {
    const page = await browser.newPage({ viewport: { width: scenario.width, height: scenario.height }, forcedColors: scenario.forcedColors ?? 'none', reducedMotion: 'reduce' });
    page.setDefaultTimeout(7000);
    try {
      await page.goto(base);
      await page.getByRole('heading', { name: 'Projects', exact: true }).waitFor();
      if (scenario.spacing) await page.addStyleTag({ content: spacing });
      async function enlargeText() {
        if (!scenario.enlarge) return;
        await page.evaluate(() => {
          const elements = [...document.querySelectorAll('body *:not([data-enlarged])')];
          const sizes = elements.map(el => parseFloat(getComputedStyle(el).fontSize));
          elements.forEach((el, i) => { el.style.setProperty('font-size', `${sizes[i] * 2}px`, 'important'); el.dataset.enlarged = 'true'; });
        });
      }
      await enlargeText();
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${output}/${scenario.name}-page.png`, fullPage: true, animations: 'disabled' });
      const pageFits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
      if (!pageFits) failures.push(`${scenario.name}: page has horizontal overflow`);
      const trigger = page.getByRole('button', { name: 'Create project', exact: true });
      if (scenario.forcedColors) {
        const colors = await trigger.evaluate(el => {
          const probe = document.createElement('button');
          probe.style.color = 'ButtonText'; document.body.append(probe);
          const expected = getComputedStyle(probe).color;
          const actual = getComputedStyle(el).color; probe.remove();
          return { expected, actual };
        });
        if (colors.actual !== colors.expected) failures.push(`forced-colors: primary label does not use system button text (${colors.actual} vs ${colors.expected})`);
      }
      await trigger.click();
      const editor = page.getByRole('dialog', { name: 'Create project', exact: true });
      await editor.waitFor();
      await enlargeText();
      await page.screenshot({ path: `${output}/${scenario.name}-editor.png`, animations: 'disabled' });
      const fits = await editor.evaluate(el => ({ width: el.clientWidth, content: el.scrollWidth, rect: el.getBoundingClientRect().toJSON() }));
      if (fits.content > fits.width + 1 || fits.rect.x < -1 || fits.rect.right > scenario.width + 1) failures.push(`${scenario.name}: editor has horizontal overflow (${fits.content}/${fits.width})`);
      const submit = editor.getByRole('button', { name: 'Create project', exact: true });
      await tabTo(page, submit);
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-invalid') === 'true');
      await checkFocus(page, `${scenario.name} validation`);
      const nameInput = editor.getByRole('textbox', { name: 'Project name', exact: true });
      await page.keyboard.insertText('Corrected project');
      if (await nameInput.getAttribute('aria-invalid') === 'true') failures.push(`${scenario.name}: corrected field still marked invalid`);
      await page.keyboard.press('Escape');
      await editor.getByText('Discard unsaved changes?', { exact: true }).waitFor();
      if (!await editor.getByRole('button', { name: 'Keep editing', exact: true }).evaluate(el => el === document.activeElement)) failures.push(`${scenario.name}: unsaved-change decision does not receive focus`);
      await editor.getByRole('button', { name: 'Discard changes', exact: true }).click();
      await editor.waitFor({ state: 'hidden' });
      assert.ok(await trigger.evaluate(el => el === document.activeElement));
      await checkFocus(page, `${scenario.name} return focus`);
      results.push(`${scenario.name}: controls remain reachable; validation and focus return pass`);
    } catch (error) { failures.push(`${scenario.name}: ${error.message}`); }
    finally { await page.close(); }
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  try {
    await page.goto(base);
    await page.getByRole('heading', { name: 'Projects', exact: true }).waitFor();
    await page.keyboard.press('Tab');
    assert.ok(await page.getByRole('link', { name: 'Skip to project workspace' }).evaluate(el => el === document.activeElement));
    await checkFocus(page, 'Skip link');
    const transition = await page.getByRole('link', { name: 'Skip to project workspace' }).evaluate(el => getComputedStyle(el).transitionDuration);
    assert.equal(transition, '0s', 'Skip link should respect reduced motion');
    await page.keyboard.press('Enter');
    assert.ok(await page.locator('main').evaluate(el => el === document.activeElement));
    await tabTo(page, page.getByRole('button', { name: 'Website refresh', exact: true }));
    await page.keyboard.press('Enter');
    const editor = page.getByRole('dialog', { name: 'Edit Website refresh', exact: true });
    await editor.waitFor();
    const name = editor.getByRole('textbox', { name: 'Project name', exact: true });
    await tabTo(page, name);
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.insertText('Keyboard project');
    await tabTo(page, editor.getByRole('button', { name: 'Save changes', exact: true }));
    await page.keyboard.press('Enter');
    await editor.waitFor({ state: 'hidden' });
    const changed = page.getByRole('button', { name: 'Keyboard project', exact: true });
    await changed.waitFor();
    assert.ok(await changed.evaluate(el => el === document.activeElement));
    results.push('Keyboard-only: skip link, edit, save and focus return pass; reduced-motion skip link is immediate');
  } catch (error) { failures.push(`keyboard: ${error.message}`); }
  finally { await page.close(); }

  await writeFile(`${output}/results.json`, JSON.stringify({ results, failures }, null, 2));
  for (const result of results) console.log(result);
  assert.deepEqual(failures, []);
} finally { await browser.close(); }
