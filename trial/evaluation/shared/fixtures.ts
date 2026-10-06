export type Invoice = { id: string; client: string; project: string; email: string; due: string; amount: number; status: 'Overdue' | 'Open' | 'Paid' };
export const today = '2026-10-07';
export const invoices: Invoice[] = [
  { id: 'INV-2101', client: 'Cedar & Co', project: 'Identity refresh', email: 'accounts@cedar.example', due: '2026-09-25', amount: 3200, status: 'Overdue' },
  { id: 'INV-2102', client: 'Lighthouse Community Arts and Learning Centre', project: 'Annual report', email: 'finance@lighthouse.example', due: '2026-10-01', amount: 875.5, status: 'Overdue' },
  { id: 'INV-2103', client: 'Juniper Labs', project: 'Product website', email: 'team@juniper.example', due: '2026-10-12', amount: 4600, status: 'Open' },
  { id: 'INV-2104', client: 'River Press', project: 'Editorial templates', email: 'billing@river.example', due: '2026-10-20', amount: 1200, status: 'Open' },
  { id: 'INV-2105', client: 'Kestrel Studio', project: 'Packaging', email: 'hello@kestrel.example', due: '2026-09-18', amount: 2500, status: 'Paid' },
  { id: 'INV-2106', client: 'Common Table', project: 'Event materials', email: 'pay@common.example', due: '2026-09-30', amount: 640, status: 'Paid' },
];
export const timezones = ['Asia/Kolkata', 'Europe/London', 'America/New_York'] as const;
export const digests = ['Never', 'Weekly', 'Daily'] as const;
export const workTypes = ['Design', 'Research', 'Editorial'] as const;
export type Settings = { displayName: string; timezone: string; digest: string; productUpdates: boolean };
export type Setup = { studioName: string; workType: string; digest: boolean };
export const settingsDefaults: Settings = { displayName: 'Sam Rivera', timezone: 'Asia/Kolkata', digest: 'Weekly', productUpdates: false };
export const setupDefaults: Setup = { studioName: '', workType: 'Design', digest: true };
