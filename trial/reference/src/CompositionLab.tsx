import { useEffect, useRef, useState } from 'react';
import { Button, RadioGroup } from '@deepak-ui/react';
import { InvoiceBaseline } from './InvoiceBaseline';
import { InvoiceGuided } from './InvoiceGuided';
import { formatAmount, formatDue, invoiceFixture, selectInvoices, type Invoice, type InvoiceFilter, type InvoiceViewProps } from './comparison-types';
import './composition-lab.css';

export default function CompositionLab() {
  const [view, setView] = useState('a');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<InvoiceFilter>('All');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [dark, setDark] = useState(() => document.documentElement.dataset.dpTheme === 'dark');
  const detailRef = useRef<HTMLElement>(null);
  const reviewTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.dpTheme = dark ? 'dark' : 'light';
    document.body.classList.toggle('dp-theme-dark', dark);
    document.body.classList.toggle('dp-theme-light', !dark);
  }, [dark]);

  useEffect(() => {
    if (selected) detailRef.current?.focus();
  }, [selected]);

  const props: InvoiceViewProps = {
    invoices: selectInvoices(search, filter), allInvoices: invoiceFixture, search, filter,
    onSearch: setSearch, onFilter: setFilter,
    onClear: () => { setSearch(''); setFilter('All'); },
    onReview: invoice => {
      reviewTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setSelected(invoice);
    },
  };

  return <div className="composition-lab">
    <a className="skip-link" href="#comparison-content">Skip to comparison</a>
    <header className="composition-lab__header">
      <div><h1>Composition lab</h1><p>One brief. The same components and data. Two independently generated layouts.</p></div>
      <nav aria-label="Demo navigation">
        <a href="/">Project workspace</a>
        <Button variant="secondary" onClick={() => setDark(value => !value)}>{dark ? 'Use light theme' : 'Use dark theme'}</Button>
      </nav>
    </header>
    <main id="comparison-content" tabIndex={-1}>
    <div className="composition-lab__controls">
      <RadioGroup label="Compare layouts" value={view} onValueChange={value => { setView(value); setSelected(null); }} options={[
        { value: 'a', label: 'Version A' }, { value: 'b', label: 'Version B' }, { value: 'both', label: 'Side by side' },
      ]} />
      <p>Search and filters stay the same when you switch. On a narrow screen, the pair stacks vertically.</p>
    </div>
      <div className="composition-lab__views" data-pair={view === 'both'}>
        {(view === 'a' || view === 'both') && <section className="composition-lab__version" aria-label="Version A">
          <p className="composition-lab__version-label">Version A</p><InvoiceBaseline {...props} />
        </section>}
        {(view === 'b' || view === 'both') && <section className="composition-lab__version" aria-label="Version B">
          <p className="composition-lab__version-label">Version B</p><InvoiceGuided {...props} />
        </section>}
      </div>
      {selected && <section className="composition-lab__detail" ref={detailRef} tabIndex={-1} aria-labelledby="invoice-detail-heading">
        <h2 id="invoice-detail-heading">Invoice {selected.id}</h2>
        <dl>
          <div><dt>Client</dt><dd>{selected.client}</dd></div>
          <div><dt>Project</dt><dd>{selected.project}</dd></div>
          <div><dt>Due date</dt><dd>{formatDue(selected.due)}</dd></div>
          <div><dt>Amount</dt><dd>{formatAmount(selected.amount)}</dd></div>
          <div><dt>Status</dt><dd>{selected.status}</dd></div>
        </dl>
        <p>This is a local preview. No reminder has been sent and no payment has been processed.</p>
        <Button variant="secondary" onClick={() => { setSelected(null); reviewTrigger.current?.focus(); }}>Close details</Button>
      </section>}
      <details className="composition-lab__method">
        <summary>How this comparison was made</summary>
        <p>Version A received the task brief, exact component APIs and brand tokens. Version B also received our composition guide. Both were generated independently with the same model, gpt-5.6-terra, and share the data and interaction logic.</p>
        <p>This is one illustrative pilot, not a blind study or evidence of a general improvement. The brief already specified controls and content. Compare task clarity, hierarchy, density and ease of review; either version may be preferable. Build and accessibility repairs are documented separately.</p>
        <p>Try finding an overdue invoice, reviewing its details, switching layouts and using the screen at mobile width. The fixtures are fictional and their statuses use a fixed reference date.</p>
      </details>
    </main>
  </div>;
}
