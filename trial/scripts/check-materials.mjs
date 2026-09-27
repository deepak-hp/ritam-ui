import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const base = process.env.REFERENCE_URL ?? 'http://127.0.0.1:5174';
const output = '.review/materials';
await mkdir(output, { recursive: true });
const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const results = [];

function contrast(a, b) {
  const luminance = rgb => rgb.map(channel => channel / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const values = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (values[1] + .05) / (values[0] + .05);
}

async function finish(page, name) {
  await page.getByRole('button', { name: 'Appearance', exact: true }).click();
  await page.getByRole('radiogroup', { name: 'Navigation finish' }).getByRole('radio', { name, exact: true }).click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(el => el === document.activeElement, await page.getByRole('button', { name: 'Appearance', exact: true }).elementHandle());
  assert.ok(await page.getByRole('button', { name: 'Appearance', exact: true }).evaluate(el => el === document.activeElement), 'Appearance must return focus');
}

try {
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const session = await page.context().newCDPSession(page);
    const normalPreferences = [
      { name: 'prefers-reduced-motion', value: 'reduce' },
      { name: 'prefers-reduced-transparency', value: 'no-preference' },
      { name: 'prefers-contrast', value: 'no-preference' },
      { name: 'forced-colors', value: 'none' },
    ];
    await session.send('Emulation.setEmulatedMedia', { features: normalPreferences });
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.getByRole('heading', { name: 'Projects', exact: true }).waitFor();
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme', exact: true }).click();
    const bar = page.locator('header.dp-navigation-surface');
    await bar.waitFor();
    const identity = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return Object.fromEntries(['--dp-orange', '--dp-on-orange', '--dp-canvas', '--dp-success', '--dp-font'].map(name => [name, style.getPropertyValue(name).trim()]));
    });
    assert.equal(identity['--dp-orange'], '#FF681F');
    assert.equal(identity['--dp-on-orange'], '#141414');
    assert.equal(identity['--dp-canvas'], theme === 'light' ? '#FFFFFF' : '#090A0C');
    assert.equal(identity['--dp-success'], theme === 'light' ? '#28694F' : '#8AD3AC');
    assert.ok(identity['--dp-font'].includes('Plus Jakarta Sans'));

    for (const material of ['Subtle', 'Expressive', 'Solid']) {
      await finish(page, material);
      assert.equal(await bar.getAttribute('data-dp-material'), material.toLowerCase());
      const styles = await bar.evaluate(el => {
        const style = getComputedStyle(el);
        return { filter: style.backdropFilter, animation: style.animationName, supported: CSS.supports('backdrop-filter', 'blur(1px)') };
      });
      if (styles.supported) assert.equal(styles.filter, material === 'Solid' ? 'none' : material === 'Subtle' ? 'blur(12px)' : 'blur(24px)');
      assert.equal(styles.animation, 'none');
      const samples = await bar.evaluate(el => {
        const style = getComputedStyle(el);
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d');
        const pixel = (colour, backdrop) => {
          ctx.clearRect(0, 0, 1, 1);
          if (backdrop) { ctx.fillStyle = backdrop; ctx.fillRect(0, 0, 1, 1); }
          ctx.fillStyle = colour; ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
        };
        return {
          backgrounds: ['#000', '#fff'].map(backdrop => pixel(style.backgroundColor, backdrop)),
          labels: [style.color, style.getPropertyValue('--dp-muted'), style.getPropertyValue('--dp-orange-text')].map(colour => pixel(colour)),
        };
      });
      const ratios = samples.backgrounds.flatMap(background => samples.labels.map(label => contrast(background, label)));
      assert.ok(Math.min(...ratios) >= 4.5, `${theme}/${material}: worst-backdrop text contrast ${Math.min(...ratios)}`);
      for (const width of [320, 615, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => { scrollTo(0, 0); return document.fonts.ready; });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${theme}/${material}/${width}: horizontal overflow`);
        if (width === 320) assert.equal(await bar.evaluate(el => getComputedStyle(el).position), 'static', 'Narrow navigation must not cover content');
        const frame = await bar.evaluate(el => ({ left: el.getBoundingClientRect().left, radius: getComputedStyle(el).borderTopLeftRadius }));
        if (material === 'Expressive') {
          assert.ok(frame.left >= 12, `Expressive must stay visibly inset at ${width}px`);
          assert.equal(frame.radius, '12px');
        } else {
          assert.equal(frame.left, 0, `${material} must remain edge-to-edge`);
          assert.equal(frame.radius, '0px');
        }
        await page.screenshot({ path: `${output}/${theme}-${material.toLowerCase()}-${width}.png`, fullPage: true, animations: 'disabled' });
      }
      await page.addScriptTag({ content: axe });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations);
      assert.deepEqual(violations.map(v => v.id), [], `${theme}/${material}: axe`);
      results.push({ theme, material, minimumTextContrast: Number(Math.min(...ratios).toFixed(2)), axeViolations: 0 });
    }

    await finish(page, 'Expressive');
    await page.getByRole('button', { name: 'Appearance', exact: true }).click();
    await page.addScriptTag({ content: axe });
    assert.deepEqual(await page.evaluate(async () => (await window.axe.run(document)).violations.map(v => v.id)), [], `${theme}: appearance panel accessibility`);
    await page.keyboard.press('Escape');
    for (const [name, value] of [['prefers-reduced-transparency', 'reduce'], ['prefers-contrast', 'more'], ['forced-colors', 'active']]) {
      await session.send('Emulation.setEmulatedMedia', { features: normalPreferences.map(feature => feature.name === name ? { name, value } : feature) });
      assert.ok(await page.evaluate(({ name, value }) => matchMedia(`(${name}: ${value})`).matches, { name, value }), `Browser must actually emulate ${name}`);
      const fallback = await bar.evaluate(el => {
        const style = getComputedStyle(el);
        const probe = document.createElement('div');
        probe.style.backgroundColor = 'var(--dp-canvas)'; probe.style.color = 'var(--dp-border)'; el.append(probe);
        const expected = getComputedStyle(probe).backgroundColor;
        const expectedBorder = getComputedStyle(probe).color; probe.remove();
        return { filter: style.backdropFilter, shadow: style.boxShadow, actual: style.backgroundColor, expected, border: style.borderTopColor, expectedBorder };
      });
      assert.equal(fallback.filter, 'none', `${theme}/${name}: blur must be removed`);
      assert.equal(fallback.shadow, 'none', `${theme}/${name}: shadow must be removed`);
      assert.equal(fallback.actual, fallback.expected, `${theme}/${name}: surface must be opaque canvas`);
      assert.equal(fallback.border, fallback.expectedBorder, `${theme}/${name}: boundary must use the stronger border`);
      results.push({ theme, preference: name, opaque: true });
    }
    await session.send('Emulation.setEmulatedMedia', { features: normalPreferences });
    await page.getByRole('link', { name: 'Skip to project workspace' }).focus();
    await page.keyboard.press('Enter');
    const anchor = await page.getByRole('main').boundingBox();
    const header = await bar.boundingBox();
    assert.ok(anchor.y >= header.y + header.height, 'Skip link destination must clear sticky navigation');
    await page.getByRole('textbox', { name: 'Search projects' }).focus();
    for (let index = 0; index < 18; index++) {
      const visibleFocus = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return false;
        const rect = el.getBoundingClientRect();
        const left = Math.max(0, rect.left), right = Math.min(innerWidth, rect.right);
        const top = Math.max(0, rect.top), bottom = Math.min(innerHeight, rect.bottom);
        if (right <= left || bottom <= top) return false;
        const hit = document.elementFromPoint((left + right) / 2, (top + bottom) / 2);
        return hit === el || el.contains(hit);
      });
      assert.ok(visibleFocus, `${theme}: sticky navigation must not cover focused controls`);
      await page.keyboard.press('Tab');
    }
    await page.setViewportSize({ width: 1280, height: 256 });
    assert.equal(await bar.evaluate(el => getComputedStyle(el).position), 'static', 'Short viewports must not pin navigation');
    assert.deepEqual(errors, []);
    await page.close();
  }
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + '\n');
  console.log('Navigation materials verified: three finishes × two themes, brand tokens, keyboard focus return, 320px reflow, worst-backdrop contrast, axe and three opaque accessibility fallbacks.');
} finally { await browser.close(); }
