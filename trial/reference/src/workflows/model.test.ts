import { describe, expect, it } from 'vitest';
import { defaults, parseSettings, parseWorkspace, validateName, filterInvoices, invoices, saveRecord } from './model';
describe('workflow boundaries', () => {
  it('rejects malformed, unversioned and invalid persisted settings', () => {
    for (const raw of ['{', '{}', JSON.stringify({ version: 1, ...defaults, notifications: 'yes' }), JSON.stringify({ version: 1, ...defaults, timezone: 'Mars' })]) expect(() => parseSettings(raw)).toThrow();
    expect(parseSettings(JSON.stringify({ version: 1, ...defaults }))).toEqual(defaults);
  });
  it('does not accept a partial or invalid completed workspace', () => {
    expect(() => parseWorkspace('{"version":1,"name":""}')).toThrow();
    expect(() => parseWorkspace('{"version":1,"name":"Studio","digest":"yes"}')).toThrow();
    expect(parseWorkspace('{"version":1,"name":"Studio","digest":true}')).toEqual({ name: 'Studio', digest: true });
  });
  it('validates trimmed names and length', () => {
    expect(validateName('  ')).toBeTruthy(); expect(validateName('x'.repeat(81))).toBeTruthy(); expect(validateName(' Studio ')).toBe('');
  });
  it('combines search and status without changing fixture records', () => {
    expect(filterInvoices(invoices, '  NORTH ', 'All')).toHaveLength(1);
    expect(filterInvoices(invoices, 'North', 'Paid')).toHaveLength(0);
    expect(filterInvoices(invoices, '', 'Paid')).toHaveLength(1);
  });
  it('propagates a write failure without reporting success or changing the payload', () => {
    const value = { ...defaults }; let calls = 0;
    expect(() => saveRecord({ setItem: () => { calls++; throw new Error('Quota'); } }, 'settings', value)).toThrow('Quota');
    expect(calls).toBe(1); expect(value).toEqual(defaults);
  });
});
