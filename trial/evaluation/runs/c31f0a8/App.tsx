import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, EmptyState, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { invoices, today, type Invoice } from '../../shared/fixtures';
import { remindInvoice } from '../../shared/service';
// @ts-expect-error The evaluation harness loads local CSS through Vite without a CSS module declaration.
import './app.css';

type FilterStatus = 'All' | Invoice['status'];
type ReminderState = 'idle' | 'pending' | 'error' | 'success';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const date = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});
const formatDate = (value: string) => date.format(new Date(`${value}T00:00:00Z`));
const statusOptions = ['All', 'Overdue', 'Open', 'Paid'].map(value => ({ value, label: value }));

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<FilterStatus>('All');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [reminder, setReminder] = useState<ReminderState>('idle');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const pendingRef = useRef(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return invoices.filter(invoice =>
      (status === 'All' || invoice.status === status)
      && `${invoice.client} ${invoice.id}`.toLocaleLowerCase().includes(needle),
    );
  }, [query, status]);

  const totals = useMemo(() => (['Overdue', 'Open', 'Paid'] as const).map(item => ({
    status: item,
    count: invoices.filter(invoice => invoice.status === item).length,
    amount: invoices.filter(invoice => invoice.status === item).reduce((sum, invoice) => sum + invoice.amount, 0),
  })), []);

  useEffect(() => {
    if (selected) requestAnimationFrame(() => document.getElementById('detail-heading')?.focus());
  }, [selected]);

  function review(invoice: Invoice, trigger: HTMLButtonElement) {
    if (pendingRef.current) return;
    triggerRef.current = trigger;
    setSelected(invoice);
    setReminder('idle');
  }

  function closeDetails() {
    if (pendingRef.current) return;
    setSelected(null);
    setReminder('idle');
    requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
      else document.getElementById('main-content')?.focus();
    });
  }

  async function sendReminder() {
    if (!selected || selected.status === 'Paid' || pendingRef.current) return;
    pendingRef.current = true;
    setReminder('pending');
    try {
      await remindInvoice(selected.id);
      setReminder('success');
    } catch {
      setReminder('error');
    } finally {
      pendingRef.current = false;
    }
  }

  function clearFilters() {
    setQuery('');
    setStatus('All');
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to invoices</a>
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">S</div>
        <div><strong>Studio Ledger</strong><span>Invoice desk</span></div>
        <p>Demo workspace</p>
      </header>

      <main id="main-content" tabIndex={-1}>
        <header className="page-heading">
          <div>
            <p className="eyebrow">Accounts receivable · as of {formatDate(today)}</p>
            <h1>Invoices</h1>
            <p>Find overdue work, review the record, then try a simulated reminder.</p>
          </div>
          <div className="demo-note"><strong>Fictional demo</strong><span>No payment or email is sent.</span></div>
        </header>

        <section className="summary" aria-label="Invoice totals for the full collection">
          {totals.map(total => <article key={total.status}>
            <div><span className={`status-dot ${total.status.toLowerCase()}`} />{total.status}</div>
            <strong>{money.format(total.amount)}</strong>
            <span>{total.count} invoices</span>
          </article>)}
        </section>

        <section className="records" aria-labelledby="records-heading">
          <div className="section-heading">
            <div><p className="eyebrow">Full collection</p><h2 id="records-heading">Review invoice records</h2></div>
            <p aria-live="polite">{visible.length} of {invoices.length} shown</p>
          </div>

          <div className="filters">
            <TextField label="Search invoices" placeholder="Client or invoice ID" value={query} onChange={event => setQuery(event.target.value)} />
            <Select label="Invoice status" value={status} onValueChange={value => setStatus(value as FilterStatus)} options={statusOptions} />
            <Button variant="secondary" onClick={clearFilters} disabled={!query && status === 'All'}>Clear filters</Button>
          </div>

          {visible.length ? (
            <div className="table-scroll" role="region" aria-label="Invoices table, scroll horizontally for all columns" tabIndex={0}>
              <table>
                <caption>Fictional invoices in USD, fixed snapshot {formatDate(today)}</caption>
                <thead><tr><th>Client</th><th>Invoice ID</th><th>Project</th><th>Due date</th><th>Amount</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>{visible.map(invoice => <tr key={invoice.id}>
                  <td><strong>{invoice.client}</strong></td><td>{invoice.id}</td><td>{invoice.project}</td>
                  <td>{formatDate(invoice.due)}</td><td className="amount">{money.format(invoice.amount)}</td>
                  <td><span className={`status-pill ${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
                  <td><Button variant="quiet" disabled={reminder === 'pending'} aria-expanded={selected?.id === invoice.id} onClick={event => review(invoice, event.currentTarget)}>Review {invoice.id}</Button></td>
                </tr>)}</tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="No matching invoices" description="Try another client or invoice ID, choose a different status, or clear the filters." action={<Button onClick={clearFilters}>Clear filters</Button>} />
          )}
        </section>

        {selected && <section className="details" aria-labelledby="detail-heading">
          <div className="detail-heading">
            <div><p className="eyebrow">Invoice details</p><h2 id="detail-heading" tabIndex={-1}>{selected.id} · {selected.client}</h2></div>
            <Button variant="quiet" onClick={closeDetails} disabled={reminder === 'pending'}>Close details</Button>
          </div>
          <dl>
            <div><dt>Client</dt><dd>{selected.client}</dd></div><div><dt>Email</dt><dd>{selected.email}</dd></div>
            <div><dt>Project</dt><dd>{selected.project}</dd></div><div><dt>Due date</dt><dd>{formatDate(selected.due)}</dd></div>
            <div><dt>Amount</dt><dd>{money.format(selected.amount)} USD</dd></div><div><dt>Status</dt><dd><span className={`status-pill ${selected.status.toLowerCase()}`}>{selected.status}</span></dd></div>
          </dl>
          {selected.status === 'Paid' ? <p className="paid-note">This invoice is paid. No reminder is needed.</p> : <div className="reminder-panel">
            <div><h3>Demo reminder</h3><p>Simulates a reminder for {selected.id}. Nothing will be sent to {selected.email}.</p></div>
            <Button loading={reminder === 'pending'} disabled={reminder === 'pending' || reminder === 'success'} onClick={sendReminder}>{reminder === 'error' ? 'Retry demo reminder' : reminder === 'success' ? 'Demo reminder sent' : 'Send demo reminder'}</Button>
            <div className="reminder-status" aria-live="polite" aria-atomic="true">
              {reminder === 'pending' && <p>Sending the demo reminder…</p>}
              {reminder === 'error' && <p role="alert">The simulated reminder failed. Nothing was sent. Retry when ready.</p>}
              {reminder === 'success' && <p className="success">Demo reminder completed successfully. No email was sent.</p>}
            </div>
          </div>}
        </section>}
      </main>
      <footer>Studio Ledger · Fictional data and simulated actions only</footer>
    </div>
  );
}
