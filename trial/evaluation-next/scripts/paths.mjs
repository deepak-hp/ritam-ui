import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const trial = resolve(root, '..');
export const ids = ['c18a4d2','c39e7b1','c62f9a3','c85d1e6'];
export const sha = value => createHash('sha256').update(value).digest('hex');
export function runPath(id) {
  if (!/^c[0-9a-f]{6}$/.test(id)) throw new Error('Invalid candidate ID');
  return resolve(root, id === 'c000000' ? '.smoke' : 'runs', id);
}
