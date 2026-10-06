import { useEffect, useMemo, useRef, useState } from 'react';
import { invoices, today, type Invoice } from '../../shared/fixtures';
import { remindInvoice } from '../../shared/service';
import './app.css';

type Filter = 'All' | Invoice['status'];
type ReminderState = 'idle' | 'pending' | 'error' | 'success';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
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

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [reminders, setReminders] = useState<Record<string, ReminderState>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const totals = useMemo(
    () => (['Overdue', 'Open', 'Paid'] as const).map((status) => ({
      status,
      records: invoices.filter((invoice) => invoice.status === status),
    })),
    [],
  );

  const visibleInvoices = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return invoices.filter((invoice) => {
      const matchesText = !needle || `${invoice.client} ${invoice.id}`.toLocaleLowerCase().includes(needle);
      return matchesText && (filter === 'All' || invoice.status === filter);
    });
  }, [filter, query]);

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetails();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  function openDetails(invoice: Invoice) {
    setSelected(invoice);
  }

  function closeDetails() {
    if (!selected) return;
    const id = selected.id;
    setSelected(null);
    requestAnimationFrame(() => triggers.current[id]?.focus());
  }

  async function sendReminder(invoice: Invoice) {
    if (reminders[invoice.id] === 'pending') return;
    setReminders((current) => ({ ...current, [invoice.id]: 'pending' }));
    try {
      await remindInvoice(invoice.id);
      setReminders((current) => ({ ...current, [invoice.id]: 'success' }));
    } catch {
      setReminders((current) => ({ ...current, [invoice.id]: 'error' }));
    }
  }

  const selectedReminder = selected ? reminders[selected.id] ?? 'idle' : 'idle';

  return (
    <main className="shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">Studio finance</p>
          <h1>Invoice follow-up</h1>
          <p className="intro">Review outstanding work and try a simulated reminder. Demo data only—nothing is sent or saved.</p>
        </div>
        <div className="as-of" aria-label={`Records as of ${formatDate(today)}`}>
          <span>Records as of</span>
          <strong>{formatDate(today)}</strong>
        </div>
      </header>

      <section className="summary" aria-labelledby="summary-title">
        <div className="section-heading">
          <h2 id="summary-title">Portfolio snapshot</h2>
          <span>All 6 invoices</span>
        </div>
        <div className="summary-grid">
          {totals.map(({ status, records }) => (
            <article className="summary-card" key={status}>
              <div className="summary-top">
                <span className={`dot ${status.toLowerCase()}`} aria-hidden="true" />
                <h3>{status}</h3>
                <span>{records.length} invoices</span>
              </div>
              <strong>{money.format(records.reduce((sum, invoice) => sum + invoice.amount, 0))}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="ledger" aria-labelledby="ledger-title">
        <div className="ledger-head">
          <div>
            <p className="eyebrow">Receivables</p>
            <h2 id="ledger-title">Invoices</h2>
          </div>
          <span className="result-count" aria-live="polite">{visibleInvoices.length} of {invoices.length}</span>
        </div>

        <div className="filters">
          <label>
            <span>Search invoices</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Client or invoice ID" type="search" />
          </label>
          <label>
            <span>Invoice status</span>
            <select value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
              <option>All</option><option>Overdue</option><option>Open</option><option>Paid</option>
            </select>
          </label>
          <button className="secondary clear" type="button" disabled={!query && filter === 'All'} onClick={() => { setQuery(''); setFilter('All'); }}>
            Clear filters
          </button>
        </div>

        {visibleInvoices.length ? (
          <div className="table-region" role="region" aria-label="Invoice records" tabIndex={0}>
            <table>
              <thead><tr><th>Client / ID</th><th>Project</th><th>Due date</th><th>Amount</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>
                {visibleInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td><strong>{invoice.client}</strong><span>{invoice.id}</span></td>
                    <td>{invoice.project}</td>
                    <td><time dateTime={invoice.due}>{formatDate(invoice.due)}</time></td>
                    <td className="amount">{money.format(invoice.amount)}</td>
                    <td><span className={`badge ${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
                    <td><button ref={(node) => { triggers.current[invoice.id] = node; }} className="review" type="button" onClick={() => openDetails(invoice)}>Review {invoice.id}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty" role="status">
            <span aria-hidden="true">0</span>
            <h3>No invoices match</h3>
            <p>Try a different client or invoice ID, or clear the current filters.</p>
            <button className="secondary" type="button" onClick={() => { setQuery(''); setFilter('All'); }}>Clear filters</button>
          </div>
        )}
      </section>

      {selected && (
        <div className="backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDetails(); }}>
          <section className="details" role="dialog" aria-modal="true" aria-labelledby="details-title">
            <div className="details-head">
              <div><p className="eyebrow">Invoice record</p><h2 id="details-title">{selected.id}</h2></div>
              <button ref={closeRef} className="icon-button" type="button" onClick={closeDetails}>Close details</button>
            </div>
            <div className="identity"><strong>{selected.client}</strong><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
            <dl>
              <div><dt>Project</dt><dd>{selected.project}</dd></div>
              <div><dt>Due date</dt><dd>{formatDate(selected.due)}</dd></div>
              <div><dt>Amount</dt><dd>{money.format(selected.amount)}</dd></div>
              <div><dt>Status</dt><dd><span className={`badge ${selected.status.toLowerCase()}`}>{selected.status}</span></dd></div>
            </dl>
            {selected.status !== 'Paid' && (
              <div className="reminder-panel">
                <h3>Demo reminder</h3>
                <p>This simulates a reminder attempt. No email will be sent.</p>
                {selectedReminder === 'error' && <p className="notice error" role="alert">The simulated reminder failed. Your invoice details are unchanged.</p>}
                {selectedReminder === 'success' && <p className="notice success" role="status">Demo reminder completed successfully.</p>}
                <button className="primary" type="button" disabled={selectedReminder === 'pending'} onClick={() => sendReminder(selected)}>
                  {selectedReminder === 'pending' ? 'Sending demo reminder…' : selectedReminder === 'error' ? 'Retry demo reminder' : selectedReminder === 'success' ? 'Send demo reminder again' : 'Send demo reminder'}
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
