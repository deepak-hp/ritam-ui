import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function normalizeBasePath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.includes('://') || /[?#]/.test(value)) {
    throw new Error('The site base path must be a URL path beginning with "/"');
  }
  const segments = value.split('/').filter(Boolean);
  if (segments.some((segment) => segment === '.' || segment === '..')) {
    throw new Error('The site base path cannot contain relative path segments');
  }
  if (segments.some((segment) => !/^[A-Za-z0-9._~-]+$/.test(segment))) {
    throw new Error('The site base path must contain only safe URL path segments');
  }
  return segments.length === 0 ? '/' : `/${segments.join('/')}/`;
}

function containsPath(parent, candidate) {
  const difference = relative(parent, candidate);
  return difference === '' || (!isAbsolute(difference) && difference !== '..' && !difference.startsWith(`..${sep}`));
}

async function requireNonemptyFile(path) {
  try {
    const details = await stat(path);
    if (!details.isFile() || details.size === 0) throw new Error();
  } catch {
    throw new Error(`A required public file is empty or missing: ${path}`);
  }
}

export async function assembleSite({ referenceDirectory, storybookDirectory, outputDirectory, basePath }) {
  const normalizedBasePath = normalizeBasePath(basePath);
  const requiredFiles = [
    join(referenceDirectory, 'index.html'),
    join(referenceDirectory, 'catalogue-assets', 'ai', 'llms-full.txt'),
    join(referenceDirectory, 'licenses', 'serein.txt'),
    join(storybookDirectory, 'index.html'),
    join(storybookDirectory, 'licenses', 'serein.txt'),
  ];
  await Promise.all(requiredFiles.map(requireNonemptyFile));

  const resolvedOutput = resolve(outputDirectory);
  if ([resolve(referenceDirectory), resolve(storybookDirectory)].some((source) => containsPath(source, resolvedOutput) || containsPath(resolvedOutput, source))) {
    throw new Error('The site output directory and build inputs must not overlap');
  }

  await rm(resolvedOutput, { recursive: true, force: true });
  await mkdir(resolvedOutput, { recursive: true });
  await cp(referenceDirectory, resolvedOutput, { recursive: true });
  await cp(storybookDirectory, join(resolvedOutput, 'storybook'), { recursive: true });

  const indexPath = join(resolvedOutput, 'index.html');
  const index = await readFile(indexPath, 'utf8');
  const catalogueUrl = `${normalizedBasePath}?view=catalogue`;
  const defaultView = `<script>if (window.location.search.length === 0) window.location.replace(${JSON.stringify(catalogueUrl)});</script>`;
  if (!index.includes('</head>')) throw new Error('The reference index is missing a closing head element');
  await writeFile(indexPath, index.replace('</head>', `  ${defaultView}\n</head>`));
  await writeFile(join(resolvedOutput, '.nojekyll'), '');

  const result = {
    basePath: normalizedBasePath,
    catalogueUrl,
    storybookUrl: `${normalizedBasePath}storybook/`,
  };
  await writeFile(join(resolvedOutput, 'site-metadata.json'), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}

function npmCliPath() {
  const candidates = [
    process.env.npm_execpath,
    join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    join(dirname(process.execPath), '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
  ].filter(Boolean).map((candidate) => resolve(candidate));
  const npmCli = candidates.find(existsSync);
  if (!npmCli) throw new Error('Could not locate npm-cli.js for the active Node runtime');
  return npmCli;
}

function runNpm(args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [npmCliPath(), ...args], { cwd: packageRoot, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`npm ${args.join(' ')} failed (${signal ?? `exit ${code}`})`));
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const valueAfter = (name, fallback) => {
    const index = args.indexOf(name);
    if (index === -1) return fallback;
    if (!args[index + 1]) throw new Error(`${name} requires a value`);
    return args[index + 1];
  };
  const basePath = normalizeBasePath(valueAfter('--base-path', '/'));
  const outputDirectory = join(packageRoot, 'site-dist');

  await runNpm(['run', 'reference:setup']);
  await runNpm(['run', 'reference:build']);
  await runNpm(['exec', '--', 'storybook', 'build', '--disable-telemetry']);
  const result = await assembleSite({
    referenceDirectory: join(packageRoot, 'reference', 'dist'),
    storybookDirectory: join(packageRoot, 'storybook-static'),
    outputDirectory,
    basePath,
  });
  process.stdout.write(`Static site assembled in ${outputDirectory}\nCatalogue: ${result.catalogueUrl}\nStorybook: ${result.storybookUrl}\n`);
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exitCode = 1;
  });
}
