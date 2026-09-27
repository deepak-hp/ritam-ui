import { Badge, Button, DataTable, Select, TextField, type DataTableColumn } from '@deepak-ui/react';
import { formatAmount, formatDue, type Invoice, type InvoiceFilter, type InvoiceViewProps } from './comparison-types';
import './invoice-baseline.css';

const statusTone = {
  Overdue: 'error',
  'Due soon': 'warning',
  Paid: 'success',
} as const;

function totalFor(invoices: Invoice[], status: Invoice['status']) {
  return invoices.reduce((total, invoice) => total + (invoice.status === status ? invoice.amount : 0), 0);
}

export function InvoiceBaseline({
  invoices,
  allInvoices,
  search,
  filter,
  onSearch,
  onFilter,
  onReview,
  onClear,
}: InvoiceViewProps) {
  const totals = {
    Overdue: totalFor(allInvoices, 'Overdue'),
    'Due soon': totalFor(allInvoices, 'Due soon'),
    Paid: totalFor(allInvoices, 'Paid'),
  };

  const columns: DataTableColumn<Invoice>[] = [
    {
      key: 'invoice',
      header: 'Invoice',
      cell: invoice => <strong className="invoice-baseline__invoice-id">{invoice.id}</strong>,
    },
    { key: 'client', header: 'Client', cell: invoice => invoice.client },
    { key: 'project', header: 'Project', cell: invoice => invoice.project },
    { key: 'due', header: 'Due date', cell: invoice => formatDue(invoice.due) },
    {
      key: 'amount',
      header: 'Amount',
      cell: invoice => <span className="invoice-baseline__amount">{formatAmount(invoice.amount)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: invoice => <Badge tone={statusTone[invoice.status]}>{invoice.status}</Badge>,
    },
    {
      key: 'action',
      header: 'Action',
      cell: invoice => (
        <Button variant="quiet" aria-label={`Review ${invoice.id}`} onClick={() => onReview(invoice)}>
          Review
        </Button>
      ),
    },
  ];

  return (
    <section className="invoice-baseline" aria-label="Invoices layout A">
      <header className="invoice-baseline__header">
        <div>
          <p className="invoice-baseline__eyebrow">Studio ledger</p>
          <h1 id="invoice-baseline-title">Invoices</h1>
          <p className="invoice-baseline__note">Fictional studio data · 28 September 2026</p>
        </div>
        <p className="invoice-baseline__count" aria-live="polite">{invoices.length} shown</p>
      </header>

      <dl className="invoice-baseline__summary" aria-label="Invoice totals">
        {(Object.keys(totals) as Invoice['status'][]).map(status => (
          <div key={status} className={`invoice-baseline__summary-item invoice-baseline__summary-item--${status.toLowerCase().replace(' ', '-')}`}>
            <dt>{status}</dt>
            <dd>{formatAmount(totals[status])}</dd>
          </div>
        ))}
      </dl>

      <div className="invoice-baseline__filters" aria-label="Invoice filters">
        <TextField
          label="Search invoices"
          type="search"
          value={search}
          onChange={event => onSearch(event.target.value)}
          placeholder="Client, project or invoice ID"
        />
        <Select
          label="Invoice status"
          value={filter}
          onValueChange={value => onFilter(value as InvoiceFilter)}
          options={['All', 'Overdue', 'Due soon', 'Paid'].map(value => ({ value, label: value }))}
        />
        <Button variant="secondary" onClick={onClear}>Clear filters</Button>
      </div>

      <div className="invoice-baseline__table-region" role="region" aria-label="Version A invoice table. Scroll horizontally to compare all invoice fields." tabIndex={0}>
        <DataTable
          caption="Studio invoices — Version A"
          rows={invoices}
          columns={columns}
          rowKey={invoice => invoice.id}
          emptyMessage="No invoices match your filters."
        />
      </div>
    </section>
  );
}
