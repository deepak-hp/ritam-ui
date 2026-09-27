export interface Invoice {
  id: string;
  client: string;
  project: string;
  due: string;
  amount: number;
  status: 'Overdue' | 'Due soon' | 'Paid';
}

export type InvoiceFilter = 'All' | Invoice['status'];

export interface InvoiceViewProps {
  invoices: Invoice[];
  allInvoices: Invoice[];
  search: string;
  filter: InvoiceFilter;
  onSearch: (value: string) => void;
  onFilter: (value: InvoiceFilter) => void;
  onReview: (invoice: Invoice) => void;
  onClear: () => void;
}

export const invoiceFixture: Invoice[] = [
  { id: 'INV-1042', client: 'Kaveri Studio', project: 'Brand identity', due: '2026-09-12', amount: 48000, status: 'Overdue' },
  { id: 'INV-1043', client: 'Fieldwork', project: 'Website design', due: '2026-09-20', amount: 72000, status: 'Overdue' },
  { id: 'INV-1044', client: 'Mango House', project: 'Product photography', due: '2026-10-02', amount: 24000, status: 'Due soon' },
  { id: 'INV-1045', client: 'Northline Books', project: 'Editorial templates', due: '2026-10-05', amount: 36000, status: 'Due soon' },
  { id: 'INV-1046', client: 'Little Fern', project: 'Packaging design', due: '2026-09-18', amount: 32000, status: 'Paid' },
];

export const formatAmount = (amount: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(amount);

export const formatDue = (due: string) => new Date(`${due}T12:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});

export function selectInvoices(search: string, filter: InvoiceFilter) {
  const query = search.trim().toLocaleLowerCase('en');
  return invoiceFixture.filter(invoice => (filter === 'All' || invoice.status === filter)
    && `${invoice.id} ${invoice.client} ${invoice.project}`.toLocaleLowerCase('en').includes(query));
}
