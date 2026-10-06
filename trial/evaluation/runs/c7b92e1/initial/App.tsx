import { useEffect, useMemo, useRef, useState } from 'react';
import { invoices, today, type Invoice } from '../../shared/fixtures';
import { remindInvoice } from '../../shared/service';
import './app.css';

type StatusFilter = 'All' | Invoice['status'];
type ReminderState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'error'; message: string }
  | { status: 'success' };

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

function StatusBadge({ status }: { status: Invoice['status'] }) {
  return <span className={`status status--${status.toLowerCase()}`}>{status}</span>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [reminders, setReminders] = useState<Record<string, ReminderState>>({});
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const dialogHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const totals = useMemo(
    () =>
      (['Overdue', 'Open', 'Paid'] as const).map((itemStatus) => {
        const matching = invoices.filter((invoice) => invoice.status === itemStatus);
        return {
          status: itemStatus,
          count: matching.length,
          amount: matching.reduce((sum, invoice) => sum + invoice.amount, 0),
        };
      }),
    [],
  );

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return invoices.filter((invoice) => {
      const matchesQuery =
        !normalizedQuery ||
        invoice.client.toLocaleLowerCase().includes(normalizedQuery) ||
        invoice.id.toLocaleLowerCase().includes(normalizedQuery);
      const matchesStatus = status === 'All' || invoice.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  useEffect(() => {
    if (!selected) return;
    dialogHeadingRef.current?.focus();
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetails();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  function openDetails(invoice: Invoice, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setSelected(invoice);
  }

  function closeDetails() {
    setSelected(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }

  function clearFilters() {
    setQuery('');
    setStatus('All');
  }

  async function sendReminder(invoice: Invoice) {
    if (reminders[invoice.id]?.status === 'pending') return;
    setReminders((current) => ({ ...current, [invoice.id]: { status: 'pending' } }));
    try {
      await remindInvoice(invoice.id);
      setReminders((current) => ({ ...current, [invoice.id]: { status: 'success' } }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The demo reminder failed.';
      setReminders((current) => ({
        ...current,
        [invoice.id]: { status: 'error', message },
      }));
    }
  }

  const selectedReminder = selected ? reminders[selected.id] ?? { status: 'idle' } : null;

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Studio billing</p>
          <h1>Invoices</h1>
          <p className="intro">
            Find outstanding work and review each record before trying a reminder.
          </p>
        </div>
        <p className="demo-note">
          <span aria-hidden="true">●</span> Fictional demo data · As of {formatDate(today)}
        </p>
      </header>

      <section className="totals" aria-labelledby="totals-heading">
        <div className="section-heading">
          <h2 id="totals-heading">Portfolio totals</h2>
          <p>All 6 invoices</p>
        </div>
        <div className="total-grid">
          {totals.map((total) => (
            <article className="total-card" key={total.status}>
              <div className="total-card__label">
                <StatusBadge status={total.status} />
                <span>{total.count} invoices</span>
              </div>
              <strong>{currency.format(total.amount)}</strong>
              <span>USD total</span>
            </article>
          ))}
        </div>
      </section>

      <section className="invoice-panel" aria-labelledby="invoice-list-heading">
        <div className="panel-heading">
          <div>
            <h2 id="invoice-list-heading">Invoice records</h2>
            <p>{filteredInvoices.length} of {invoices.length} shown</p>
          </div>
          <button className="text-button" type="button" onClick={clearFilters} disabled={!query && status === 'All'}>
            Clear filters
          </button>
        </div>

        <div className="filters">
          <label>
            <span>Search invoices</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Client or invoice ID"
            />
          </label>
          <label>
            <span>Invoice status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
              <option>All</option>
              <option>Overdue</option>
              <option>Open</option>
              <option>Paid</option>
            </select>
          </label>
        </div>

        {filteredInvoices.length ? (
          <div className="table-region" role="region" aria-label="Filtered invoice records" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Project</th>
                  <th scope="col">Due date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="client-cell">{invoice.client}</td>
                    <td className="mono">{invoice.id}</td>
                    <td>{invoice.project}</td>
                    <td>{formatDate(invoice.due)}</td>
                    <td className="amount-cell">{currency.format(invoice.amount)}</td>
                    <td><StatusBadge status={invoice.status} /></td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="review-button"
                        onClick={(event) => openDetails(invoice, event.currentTarget)}
                      >
                        Review {invoice.id}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">0</span>
            <h3>No invoices match</h3>
            <p>Try another client or invoice ID, or reset the status filter.</p>
            <button type="button" className="secondary-button" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </section>

      {selected && selectedReminder && (
        <div className="dialog-backdrop">
          <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog__header">
              <div>
                <p className="eyebrow">Invoice review</p>
                <h2 id="dialog-title" ref={dialogHeadingRef} tabIndex={-1}>{selected.id}</h2>
                <p>{selected.client}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <dl className="detail-list">
              <div><dt>Project</dt><dd>{selected.project}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
              <div><dt>Due date</dt><dd>{formatDate(selected.due)}</dd></div>
              <div><dt>Amount</dt><dd>{currency.format(selected.amount)} USD</dd></div>
              <div><dt>Status</dt><dd>{selected.status}</dd></div>
            </dl>

            {selected.status !== 'Paid' && (
              <div className="reminder-area">
                {selectedReminder.status === 'error' && (
                  <p className="feedback feedback--error" role="alert">
                    <strong>Reminder not sent.</strong> {selectedReminder.message}
                  </p>
                )}
                {selectedReminder.status === 'success' && (
                  <p className="feedback feedback--success" role="status">
                    <strong>Demo reminder sent.</strong> This simulated action completed successfully.
                  </p>
                )}
                {selectedReminder.status !== 'success' && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => sendReminder(selected)}
                    disabled={selectedReminder.status === 'pending'}
                  >
                    {selectedReminder.status === 'pending'
                      ? 'Sending demo reminder…'
                      : selectedReminder.status === 'error'
                        ? 'Retry demo reminder'
                        : 'Send demo reminder'}
                  </button>
                )}
              </div>
            )}

            <button type="button" className="secondary-button dialog__close" onClick={closeDetails}>
              Close details
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
