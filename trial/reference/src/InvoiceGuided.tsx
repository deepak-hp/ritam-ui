import { Badge, Button, DataTable, Select, TextField } from '@deepak-ui/react';
import { formatAmount, formatDue, type Invoice, type InvoiceFilter, type InvoiceViewProps } from './comparison-types';
import './invoice-guided.css';

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Overdue', label: 'Overdue' },
  { value: 'Due soon', label: 'Due soon' },
  { value: 'Paid', label: 'Paid' },
];

function statusTone(status: Invoice['status']): 'neutral' | 'success' | 'warning' {
  if (status === 'Overdue') return 'warning';
  if (status === 'Paid') return 'success';
  return 'neutral';
}

export function InvoiceGuided({
  invoices,
  allInvoices,
  search,
  filter,
  onSearch,
  onFilter,
  onReview,
  onClear,
}: InvoiceViewProps) {
  const totals = allInvoices.reduce<Record<Invoice['status'], number>>((sum, invoice) => {
    sum[invoice.status] += invoice.amount;
    return sum;
  }, { Overdue: 0, 'Due soon': 0, Paid: 0 });

  const columns = [
    {
      key: 'client',
      header: 'Client',
      cell: (invoice: Invoice) => <strong className="invoice-guided__client">{invoice.client}</strong>,
    },
    {
      key: 'id',
      header: 'Invoice ID',
      cell: (invoice: Invoice) => <span className="invoice-guided__id">{invoice.id}</span>,
    },
    { key: 'project', header: 'Project', cell: (invoice: Invoice) => invoice.project },
    { key: 'due', header: 'Due date', cell: (invoice: Invoice) => formatDue(invoice.due) },
    {
      key: 'amount',
      header: 'Amount',
      cell: (invoice: Invoice) => <span className="invoice-guided__amount">{formatAmount(invoice.amount)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (invoice: Invoice) => <Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge>,
    },
    {
      key: 'review',
      header: 'Review',
      cell: (invoice: Invoice) => (
        <Button variant="quiet" onClick={() => onReview(invoice)} aria-label={`Review ${invoice.id}`}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <section className="invoice-guided" aria-label="Invoices layout B">
      <header className="invoice-guided__header">
        <div>
          <p className="invoice-guided__eyebrow">Studio finance</p>
          <h1 id="invoices-heading">Invoices</h1>
          <p className="invoice-guided__note">Fictional studio data · 28 September 2026</p>
        </div>
        <p className="invoice-guided__priority"><strong>Follow up first:</strong> overdue invoices need review.</p>
      </header>

      <section className="invoice-guided__summary" aria-label="Invoice collection summary">
        <div className="invoice-guided__summary-item invoice-guided__summary-item--priority">
          <span>Overdue</span>
          <strong>{formatAmount(totals.Overdue)}</strong>
        </div>
        <div className="invoice-guided__summary-item">
          <span>Due soon</span>
          <strong>{formatAmount(totals['Due soon'])}</strong>
        </div>
        <div className="invoice-guided__summary-item">
          <span>Paid</span>
          <strong>{formatAmount(totals.Paid)}</strong>
        </div>
      </section>

      <section className="invoice-guided__collection" aria-labelledby="invoice-list-heading">
        <div className="invoice-guided__collection-heading">
          <div>
            <p className="invoice-guided__eyebrow">Collection</p>
            <h2 id="invoice-list-heading">Review the invoice queue</h2>
          </div>
          <p>{invoices.length} {invoices.length === 1 ? 'invoice' : 'invoices'}</p>
        </div>

        <div className="invoice-guided__filters" aria-label="Invoice filters">
          <TextField
            label="Search invoices"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Client, project, or invoice ID"
          />
          <Select
            label="Invoice status"
            value={filter}
            onValueChange={(value) => onFilter(value as InvoiceFilter)}
            options={statusOptions}
          />
          <Button variant="secondary" onClick={onClear}>Clear filters</Button>
        </div>

        <div className="invoice-guided__table-region" role="region" tabIndex={0} aria-label="Version B invoice table. Scroll horizontally to compare all invoice fields.">
          <DataTable
            caption="Studio invoices — Version B"
            rows={invoices}
            columns={columns}
            rowKey={(invoice) => invoice.id}
            sort={null}
            emptyMessage="No invoices match your filters."
          />
        </div>
      </section>
    </section>
  );
}
