import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this check with npm run check:consumer.');
const node = process.execPath;
const consumerDirectory = join(root, '.consumer-check');
const cacheDirectory = join(root, '.npm-cache');

function npm(args, cwd = root) {
  return execFileSync(node, [npmCli, ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: cacheDirectory },
  });
}

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? cssFiles(entryPath) : entry.name.endsWith('.css') ? [entryPath] : [];
  }));
  return files.flat();
}

let packageTarball;

try {
  const packed = JSON.parse(npm(['pack', '--json']));
  packageTarball = join(root, packed[0].filename);

  await rm(consumerDirectory, { recursive: true, force: true });
  await mkdir(consumerDirectory, { recursive: true });
  await writeFile(join(consumerDirectory, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
  }, null, 2));
  await writeFile(join(consumerDirectory, 'consumer.tsx'), await readFile(join(root, 'tests/fixtures/consumer.tsx'), 'utf8'));
  await writeFile(join(consumerDirectory, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { strict: true, noEmit: true, target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', skipLibCheck: false, types: ['react', 'react-dom'] },
    include: ['consumer.tsx'],
  }, null, 2));

  npm(['install', '--ignore-scripts', '--no-package-lock', packageTarball, 'react@^19.3.0', 'react-dom@^19.3.0', '@types/react@^19.3.0', '@types/react-dom@^19.3.0', 'esbuild@^0.28.2'], consumerDirectory);

  const projectRequire = createRequire(import.meta.url);
  execFileSync(node, [projectRequire.resolve('typescript/bin/tsc'), '-p', join(consumerDirectory, 'tsconfig.json')], { cwd: consumerDirectory, stdio: 'inherit' });

  if (existsSync(join(consumerDirectory, 'node_modules', '@stylexjs', 'babel-plugin'))) {
    throw new Error('Consumer check must bundle without the StyleX compiler');
  }

  const require = createRequire(join(consumerDirectory, 'package.json'));
  const { build } = require('esbuild');
  await build({
    entryPoints: [join(consumerDirectory, 'consumer.tsx')],
    outdir: join(consumerDirectory, 'dist'),
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
  });

  const bundle = await readFile(join(consumerDirectory, 'dist', 'consumer.js'), 'utf8');
  if (/stylex\.create\s*\(/.test(bundle)) {
    throw new Error('Consumer bundle contains an uncompiled stylex.create call');
  }

  const emittedCss = await cssFiles(join(consumerDirectory, 'dist'));
  if (emittedCss.length === 0) throw new Error('Consumer bundle did not emit CSS');
  const css = (await Promise.all(emittedCss.map((file) => readFile(file, 'utf8')))).join('\n');
  if (!css.includes('--dp-orange')) throw new Error('Consumer CSS does not contain the library theme tokens');
  if (!css.includes('.dp-calendar')) throw new Error('Consumer CSS does not include calendar styles');
  if (!css.includes('.dp-status-icon--pending')) {
    throw new Error('Consumer CSS does not contain the StatusIcon motion rules');
  }
  console.log('Packed consumer: strict public types, accessible-name contract and compiler-free JS/CSS bundle verified.');
} finally {
  if (packageTarball && existsSync(packageTarball)) await rm(packageTarball, { force: true });
}
