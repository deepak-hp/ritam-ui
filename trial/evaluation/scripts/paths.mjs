import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const trial = resolve(root, '..');
export function runPath(id) {
  if (!/^c[0-9a-f]{6}$/.test(id)) throw new Error('Expected opaque candidate ID c + six hex digits');
  return resolve(root, process.env.EVALUATION_SCRATCH === '1' ? '.scratch' : 'runs', id);
}
