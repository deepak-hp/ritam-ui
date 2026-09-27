import { describe, expect, it } from 'vitest';
import { invoiceFixture, selectInvoices, formatAmount, formatDue } from './comparison-types';

describe('shared comparison fixture', () => {
  it('searches client, invoice and project without losing the status filter', () => {
    expect(selectInvoices(' kaveri ', 'All').map(row => row.id)).toEqual(['INV-1042']);
    expect(selectInvoices('INV-1043', 'Overdue').map(row => row.id)).toEqual(['INV-1043']);
    expect(selectInvoices('packaging', 'All').map(row => row.id)).toEqual(['INV-1046']);
    expect(selectInvoices('kaveri', 'Paid')).toEqual([]);
  });

  it('restores the complete shared dataset when filters are cleared', () => {
    expect(selectInvoices('', 'All')).toEqual(invoiceFixture);
    expect(selectInvoices('', 'Overdue').reduce((sum, row) => sum + row.amount, 0)).toBe(120000);
  });

  it('shows deterministic INR amounts and date-only values', () => {
    expect(formatAmount(120000)).toBe('₹1,20,000');
    expect(formatDue('2026-09-12')).toBe('12 Sept 2026');
  });
});
