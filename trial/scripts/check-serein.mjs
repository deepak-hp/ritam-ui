import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const output = resolve('../.impeccable/review');
await mkdir(output, { recursive: true });
const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const url = new URL(process.env.REFERENCE_URL ?? 'http://127.0.0.1:5174/');
url.search = '?view=serein';
const results = [];
function contrast(a, b) {
  const luminance = hex => {
    const value = hex.replace('#', '');
    const rgb = value.length === 3 ? [...value].map(channel => channel.repeat(2)) : value.match(/../g);
    return rgb.map(channel => parseInt(channel, 16) / 255)
      .map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4)
      .reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
  };
  const values = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (values[1] + .05) / (values[0] + .05);
}
try {
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(12000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url.href);
    await page.getByRole('heading', { name: /Clarity, with a/ }).waitFor();
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme', exact: true }).click();
    await page.evaluate(() => document.fonts.ready);
    const tokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return Object.fromEntries(['canvas', 'surface', 'raised', 'field', 'selected', 'hover', 'active', 'text', 'muted', 'border', 'orange', 'orange-hover', 'orange-active', 'on-orange', 'orange-text', 'success', 'error', 'warning', 'success-surface', 'error-surface', 'warning-surface'].map(key => [key, style.getPropertyValue(`--dp-${key}`).trim()]));
    });
    const ratios = [];
    for (const background of ['canvas', 'surface', 'raised', 'field', 'selected']) {
      for (const foreground of ['text', 'muted', 'orange-text', 'success', 'error']) {
        const ratio = contrast(tokens[foreground], tokens[background]);
        ratios.push({ foreground, background, ratio: +ratio.toFixed(2) });
        assert.ok(ratio >= 4.5, `${theme} ${foreground}/${background}: ${ratio}`);
      }
      assert.ok(contrast(tokens.border, tokens[background]) >= 3, `${theme} control border on ${background}`);
    }
    for (const fill of ['orange', 'orange-hover', 'orange-active']) assert.ok(contrast(tokens['on-orange'], tokens[fill]) >= 4.5, `${theme} primary ${fill}`);
    for (const fill of ['hover', 'active']) assert.ok(contrast(tokens.text, tokens[fill]) >= 4.5, `${theme} neutral ${fill}`);
    for (const tone of ['success', 'error', 'warning']) {
      const ratio = contrast(tokens[tone], tokens[`${tone}-surface`]);
      ratios.push({ foreground: tone, background: `${tone}-surface`, ratio: +ratio.toFixed(2) });
      assert.ok(ratio >= 4.5, `${theme} ${tone} badge ${ratio}`);
    }
    const switchAlignment = await page.getByRole('switch', { name: 'Email summaries' }).evaluate(el => {
      const label = el.closest('label').querySelector(':scope > span:last-child');
      const description = document.getElementById(el.getAttribute('aria-describedby'));
      return Math.abs(label.getBoundingClientRect().left - description.getBoundingClientRect().left);
    });
    assert.ok(switchAlignment < 1, `${theme} switch helper text alignment: ${switchAlignment}`);
    const disabled = page.getByRole('button', { name: 'Save changes', exact: true });
    const disabledStyle = el => ({ fill: getComputedStyle(el).backgroundColor, transform: getComputedStyle(el).transform, shadow: getComputedStyle(el).boxShadow });
    const restingDisabled = await disabled.evaluate(disabledStyle);
    await disabled.hover({ force: true });
    await page.mouse.down();
    assert.deepEqual(await disabled.evaluate(disabledStyle), restingDisabled, `${theme} disabled must not react to pointer`);
    await page.mouse.up();
    for (const width of [1440, 966, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1050 : width === 966 ? 870 : 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${theme}/${width} overflow`);
      await page.addScriptTag({ content: axe });
      const audit = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      assert.deepEqual(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })), [], `${theme}/${width} axe`);
      await page.screenshot({ path: `${output}/serein-${theme}-${width}.png`, fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.getByLabel('Email address', { exact: true }).fill('invalid');
    await page.getByRole('button', { name: 'Send test email', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Enter an email address' }).waitFor();
    await page.getByLabel('Email address', { exact: true }).fill('hello@example.com');
    await page.getByRole('combobox', { name: 'Summary frequency' }).click();
    await page.getByRole('option', { name: 'Every day', exact: true }).hover();
    assert.equal(await page.getByRole('option', { name: 'Every day', exact: true }).evaluate(el => el.matches(':focus-visible')), false, `${theme} pointer option must not inherit keyboard focus treatment`);
    await page.keyboard.press('ArrowDown');
    const optionFocus = await page.getByRole('option').evaluateAll(elements => elements.filter(el => el.matches(':focus-visible')).map(el => ({ outline: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth })));
    assert.ok(optionFocus.length === 1 && optionFocus[0].outline === 'solid' && optionFocus[0].width === '2px', `${theme} select keyboard focus: ${JSON.stringify(optionFocus)}`);
    await page.getByRole('listbox').screenshot({ path: `${output}/serein-select-${theme}-keyboard.png` });
    await page.getByRole('option', { name: 'Every day', exact: true }).click();
    assert.ok((await page.getByRole('combobox', { name: 'Summary frequency' }).textContent()).includes('Every day'));
    await page.getByRole('button', { name: 'Review changes', exact: true }).click();
    await page.getByRole('dialog').waitFor();
    await page.waitForFunction(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement));
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement?.textContent?.trim() === 'Review changes');
    await page.getByRole('button', { name: 'Send test email', exact: true }).click();
    await page.getByText('Sending the preview…', { exact: true }).waitFor();
    assert.equal(await page.locator('.serein-status .dp-status-icon').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await page.getByText('Ready when you are.', { exact: true }).waitFor();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.getByRole('button', { name: 'Send test email', exact: true }).click();
    await page.getByText('Sending the preview…', { exact: true }).waitFor();
    assert.notEqual(await page.locator('.serein-status .dp-status-icon').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.getByText('Test complete. Your preview is ready.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Workspace actions', exact: true }).click();
    await page.getByRole('menuitem', { name: 'About this preview', exact: true }).hover();
    assert.equal(await page.getByRole('menuitem', { name: 'About this preview', exact: true }).evaluate(el => el.matches(':focus-visible')), false, `${theme} pointer menu must not inherit keyboard focus treatment`);
    await page.keyboard.press('ArrowDown');
    const menuFocus = await page.getByRole('menuitem').evaluateAll(elements => elements.filter(el => el.matches(':focus-visible')).map(el => ({ outline: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth })));
    assert.ok(menuFocus.length === 1 && menuFocus[0].outline === 'solid' && menuFocus[0].width === '2px', `${theme} menu keyboard focus: ${JSON.stringify(menuFocus)}`);
    await page.getByRole('menu').screenshot({ path: `${output}/serein-menu-${theme}-keyboard.png` });
    await page.getByRole('menuitem', { name: 'About this preview', exact: true }).click();
    await page.getByText('Changes stay on this page and reset when you reload. Nothing is sent or saved.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Workspace actions', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Reset settings', exact: true }).click();
    await page.getByText('Settings reset.', { exact: true }).waitFor();
    assert.equal(await page.getByLabel('Workspace name', { exact: true }).inputValue(), 'Studio workspace');
    await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
    assert.equal(await page.getByRole('button', { name: 'Send test email', exact: true }).evaluate(el => getComputedStyle(el).boxShadow), 'none');
    await page.emulateMedia({ forcedColors: 'none' });
    const accordionUrl = new URL(url); accordionUrl.search = '?view=catalogue&component=Accordion';
    await page.goto(accordionUrl.href);
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme', exact: true }).click();
    const first = page.getByRole('button', { name: 'Where is my data stored?', exact: true });
    await first.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    const boundary = await first.evaluate(el => ({ outline: getComputedStyle(el).outlineWidth, outlineStyle: getComputedStyle(el).outlineStyle, focused: el === document.activeElement && el.matches(':focus-visible'), overflow: getComputedStyle(el.parentElement.parentElement.parentElement).overflow }));
    assert.notEqual(boundary.outline, '0px');
    assert.equal(boundary.outlineStyle, 'solid');
    assert.equal(boundary.focused, true);
    assert.equal(boundary.overflow, 'visible', 'Accordion must not clip external focus outlines');
    await page.locator('.catalogue-preview').screenshot({ path: `${output}/serein-accordion-${theme}-first.png` });
    await page.keyboard.press('Tab');
    assert.ok(await page.getByRole('button', { name: 'How do I reset it?', exact: true }).evaluate(el => el === document.activeElement));
    await page.locator('.catalogue-preview').screenshot({ path: `${output}/serein-accordion-${theme}-last.png` });
    assert.deepEqual(errors, [], `${theme} browser errors`);
    results.push({ theme, widths: [1440, 966, 390, 320], ratios, axe: 'passed', interactions: 'validation, select, dialog focus return, cancellation, success, reset; disabled pointer stability; switch helper alignment; distinct pointer and keyboard focus in select and menu', preferences: 'reduced and full motion; forced-color button shadow' });
    await page.close();
  }
  console.log('Serein: eight responsive/theme axe audits; token/state contrast; disabled pointer stability; switch alignment; validation, select, dialog, async and motion checks passed.');
} finally {
  await writeFile(`${output}/serein-results.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
