import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Badge, Button, EmptyState, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { invoices, today, type Invoice } from '../../shared/fixtures';
import { remindInvoice } from '../../shared/service';
// @ts-expect-error The evaluation harness supplies the CSS loader without a declaration shim.
import './app.css';

type FilterStatus = 'All' | Invoice['status'];
type ReminderState = 'idle' | 'pending' | 'error' | 'success';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const date = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(value: string) {
  return date.format(new Date(`${value}T00:00:00Z`));
}

function statusTone(status: Invoice['status']) {
  if (status === 'Overdue') return 'error' as const;
  if (status === 'Paid') return 'success' as const;
  return 'neutral' as const;
}

function InvoiceDetails({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [reminderState, setReminderState] = useState<ReminderState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  async function sendReminder() {
    if (reminderState === 'pending') return;
    setReminderState('pending');
    setErrorMessage('');
    try {
      await remindInvoice(invoice.id);
      setReminderState('success');
    } catch (error) {
      setReminderState('error');
      setErrorMessage(error instanceof Error ? error.message : 'The demo reminder failed.');
    }
  }

  return (
    <aside className="details" aria-labelledby="details-title">
      <div className="details-heading">
        <div>
          <p className="eyebrow">Invoice review</p>
          <h2 id="details-title" ref={headingRef} tabIndex={-1}>
            {invoice.id} <span>· {invoice.client}</span>
          </h2>
        </div>
        <Button variant="quiet" onClick={onClose}>Close details</Button>
      </div>

      <dl className="facts">
        <div><dt>Client</dt><dd>{invoice.client}</dd></div>
        <div><dt>Email</dt><dd>{invoice.email}</dd></div>
        <div><dt>Project</dt><dd>{invoice.project}</dd></div>
        <div><dt>Invoice ID</dt><dd>{invoice.id}</dd></div>
        <div><dt>Due date</dt><dd>{formatDate(invoice.due)}</dd></div>
        <div><dt>Amount</dt><dd>{money.format(invoice.amount)}</dd></div>
        <div><dt>Status</dt><dd><Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge></dd></div>
      </dl>

      {invoice.status === 'Paid' ? (
        <p className="paid-note">This invoice is paid. No reminder is needed.</p>
      ) : (
        <section className="reminder" aria-labelledby="reminder-title">
          <div>
            <h3 id="reminder-title">Demo reminder</h3>
            <p>This is a fictional, simulated action. No email will be sent to {invoice.email}.</p>
          </div>
          <Button
            onClick={sendReminder}
            loading={reminderState === 'pending'}
            disabled={reminderState === 'pending' || reminderState === 'success'}
          >
            {reminderState === 'error' ? 'Retry demo reminder' :
              reminderState === 'success' ? 'Demo reminder sent' : 'Send demo reminder'}
          </Button>
          <div className="reminder-status" aria-live="polite" aria-atomic="true">
            {reminderState === 'pending' && <p>Sending the demo reminder…</p>}
            {reminderState === 'success' && (
              <Alert title="Demo reminder completed" tone="success" live="polite">
                The simulation resolved successfully. No email was sent.
              </Alert>
            )}
            {reminderState === 'error' && (
              <Alert title="Demo reminder failed" tone="error" live="assertive">
                {errorMessage} Your invoice remains selected; retry when ready.
              </Alert>
            )}
          </div>
        </section>
      )}
    </aside>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<FilterStatus>('All');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const reviewTrigger = useRef<HTMLButtonElement | null>(null);

  const visibleInvoices = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return invoices.filter((invoice) =>
      (status === 'All' || invoice.status === status) &&
      (`${invoice.client} ${invoice.id}`).toLocaleLowerCase().includes(needle),
    );
  }, [query, status]);

  const totals = (['Overdue', 'Open', 'Paid'] as const).map((value) => {
    const group = invoices.filter((invoice) => invoice.status === value);
    return { status: value, count: group.length, amount: group.reduce((sum, item) => sum + item.amount, 0) };
  });

  function clearFilters() {
    setQuery('');
    setStatus('All');
  }

  function closeDetails() {
    setSelected(null);
    requestAnimationFrame(() => reviewTrigger.current?.focus());
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main">Kindred<span>Studio</span></a>
        <p>Invoice desk</p>
      </header>

      <main id="main" className="page">
        <header className="intro">
          <div>
            <p className="eyebrow">Receivables · {formatDate(today)}</p>
            <h1>Invoices needing attention</h1>
            <p>Find overdue work, verify the record, then try a demo reminder.</p>
          </div>
          <p className="demo-note"><strong>Demo workspace</strong> Fictional records and simulated reminders only.</p>
        </header>

        <section aria-labelledby="summary-title" className="summary-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Full collection</p>
              <h2 id="summary-title">Status totals</h2>
            </div>
            <p>{invoices.length} invoices · {money.format(invoices.reduce((sum, item) => sum + item.amount, 0))}</p>
          </div>
          <div className="summary-grid">
            {totals.map((total) => (
              <article className={`summary-card summary-${total.status.toLowerCase()}`} key={total.status}>
                <div><span className="status-dot" aria-hidden="true" /><h3>{total.status}</h3></div>
                <strong>{money.format(total.amount)}</strong>
                <p>{total.count} {total.count === 1 ? 'invoice' : 'invoices'}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="records" aria-labelledby="records-title">
          <div className="section-heading records-heading">
            <div>
              <p className="eyebrow">All records</p>
              <h2 id="records-title">Invoice register</h2>
            </div>
            <p role="status">Showing {visibleInvoices.length} of {invoices.length}</p>
          </div>

          <div className="filters">
            <TextField
              label="Search invoices"
              placeholder="Client or invoice ID"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Select
              label="Invoice status"
              value={status}
              onValueChange={(value) => setStatus(value as FilterStatus)}
              options={['All', 'Overdue', 'Open', 'Paid'].map((value) => ({ value, label: value }))}
            />
            <Button variant="secondary" onClick={clearFilters} disabled={!query && status === 'All'}>
              Clear filters
            </Button>
          </div>

          {visibleInvoices.length ? (
            <div className="table-region" role="region" aria-label="Invoices table" tabIndex={0}>
              <table>
                <caption>Fictional studio invoices as of {formatDate(today)}</caption>
                <thead><tr><th>Client</th><th>Invoice ID</th><th>Project</th><th>Due date</th><th className="amount">Amount</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {visibleInvoices.map((invoice) => (
                    <tr key={invoice.id} className={selected?.id === invoice.id ? 'is-selected' : undefined}>
                      <td className="client-cell">{invoice.client}</td>
                      <td>{invoice.id}</td>
                      <td>{invoice.project}</td>
                      <td><time dateTime={invoice.due}>{formatDate(invoice.due)}</time></td>
                      <td className="amount">{money.format(invoice.amount)}</td>
                      <td><Badge tone={statusTone(invoice.status)}>{invoice.status}</Badge></td>
                      <td>
                        <Button
                          variant="quiet"
                          aria-expanded={selected?.id === invoice.id}
                          onClick={(event) => {
                            reviewTrigger.current = event.currentTarget;
                            setSelected(invoice);
                          }}
                        >Review {invoice.id}</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No matching invoices"
              description="Try a different client or invoice ID, choose another status, or clear the filters."
              action={<Button onClick={clearFilters}>Clear filters</Button>}
            />
          )}
        </section>

        {selected && <InvoiceDetails key={selected.id} invoice={selected} onClose={closeDetails} />}
      </main>

      <footer>Fictional demo data · No payments, messages, or changes are persisted.</footer>
    </div>
  );
}
