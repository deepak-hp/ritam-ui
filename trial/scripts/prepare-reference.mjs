import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const app = join(root, 'reference');
const vendor = join(app, 'vendor');
if (!process.env.npm_execpath) throw new Error('Use npm run reference:setup from trial.');
function npm(args, cwd = root) {
  return execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd, encoding: 'utf8', env: { ...process.env, npm_config_cache: join(root, '.npm-cache') },
  });
}
await mkdir(vendor, { recursive: true });
console.log(npm(['run', 'build']));
const packed = JSON.parse(npm(['pack', '--json', '--pack-destination', vendor]));
const original = join(vendor, packed[0].filename);
const hash = createHash('sha256').update(await readFile(original)).digest('hex').slice(0, 12);
const archive = join(vendor, `serein-ui-react-${hash}.tgz`);
await rename(original, archive);
console.log(npm(['install', '--ignore-scripts', '--no-audit', '--no-fund', `./vendor/serein-ui-react-${hash}.tgz`], app));
console.log('Reference app uses a packed copy of the library. Run npm run reference:dev.');
