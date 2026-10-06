import type { Settings, Setup } from './fixtures.ts';
type Operation = 'remindInvoice' | 'saveSettings' | 'finishSetup';
export type Entry = { operation: Operation; input: unknown; outcome: 'pending' | 'rejected' | 'resolved' };
export const journal: Entry[] = [];
const counts = { remindInvoice: 0, saveSettings: 0, finishSetup: 0 };
async function perform<T>(operation: Operation, input: T): Promise<T> {
  const attempt = ++counts[operation];
  const entry: Entry = { operation, input: structuredClone(input), outcome: 'pending' };
  journal.push(entry);
  await new Promise(resolve => setTimeout(resolve, 400));
  if (attempt === 1) { entry.outcome = 'rejected'; throw new Error('Simulated failure; retry.'); }
  entry.outcome = 'resolved';
  return structuredClone(input);
}
export async function remindInvoice(id: string): Promise<void> { await perform('remindInvoice', id); }
export function saveSettings(value: Settings): Promise<Settings> { return perform('saveSettings', value); }
export function finishSetup(value: Setup): Promise<Setup> { return perform('finishSetup', value); }
