import { useEffect, useState } from 'react';
import { Badge, Button, Card, Checkbox, Dialog, DropdownMenu, Select, StatusIcon, Switch, TextField, useAsyncAction } from '@serein-ui/react';
import './serein-studio.css';

function Mark() {
  return <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 10h18M8 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="m11 5-2 3m10 12-2 3" stroke="var(--dp-orange-text)" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function Arrow() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>;
}
function sendPreview(signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, 1500);
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
  });
}

export default function SereinStudio() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.dpTheme === 'dark');
  const [name, setName] = useState('Studio workspace');
  const [email, setEmail] = useState('hello@example.com');
  const [frequency, setFrequency] = useState('weekly');
  const [summaries, setSummaries] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [validated, setValidated] = useState(false);
  const [menuFeedback, setMenuFeedback] = useState('');
  const action = useAsyncAction(sendPreview);
  const emailError = validated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter an email address, such as hello@example.com.' : undefined;
  const nameError = validated && !name.trim() ? 'Give your workspace a name.' : undefined;
  useEffect(() => {
    document.documentElement.dataset.dpTheme = dark ? 'dark' : 'light';
    document.title = 'Serein · Design studio';
  }, [dark]);
  const message = action.state === 'pending' ? 'Sending the preview…' : action.state === 'success' ? 'Test complete. Your preview is ready.' : action.state === 'error' ? 'The preview failed. Please try again.' : 'Ready when you are.';
  return <div className="serein-studio">
    <a className="skip-link" href="#serein-main">Skip to studio</a>
    <header className="serein-header">
      <a className="serein-wordmark" href="?view=serein"><Mark/>Serein</a>
      <nav aria-label="Design library"><a href="?view=serein" aria-current="page">Design studio</a><a href="?view=catalogue">Components</a><a href="?view=workspace">Workspace</a></nav>
      <Button variant="secondary" onClick={() => setDark(!dark)}>{dark ? 'Use light theme' : 'Use dark theme'}</Button>
    </header>
    <main id="serein-main" tabIndex={-1}>
      <div className="serein-layout">
        <section className="serein-intro" aria-labelledby="serein-title">
          <h1 id="serein-title">Clarity, with a<br/>little warmth.</h1>
          <p className="serein-lead">A quieter frame for your ideas. Clear surfaces, warm orange, and movement that settles into place.</p>
          <a className="serein-library-link" href="?view=catalogue">Explore all 42 components <Arrow/></a>
          <section className="serein-action-study" aria-labelledby="action-title">
            <h2 id="action-title">A clear next step</h2>
            <p>One warm accent. The rest leaves room.</p>
            <div className="serein-action-row"><Button onClick={() => document.getElementById('delivery-title')?.focus()}>Try the controls <Arrow/></Button><Button variant="secondary" onClick={() => setDark(!dark)}>{dark ? 'Light canvas' : 'Dark canvas'}</Button></div>
            <div className="serein-action-row serein-states"><div><span>In progress</span><Button loading>Saving changes</Button></div><div><span>Unavailable</span><Button disabled>Save changes</Button></div></div>
          </section>
          <section className="serein-palette" aria-labelledby="palette-title">
            <h2 id="palette-title">Warmth meets evening</h2>
            <div className="serein-swatch-strip" aria-hidden="true"><i className="serein-swatch-flame"/><i className="serein-swatch-canvas"/><i className="serein-swatch-surface"/><i className="serein-swatch-ink"/></div>
            <dl><div><dt>Flame</dt><dd>{dark ? '#FF803E' : '#FF681F'}</dd></div><div><dt>{dark ? 'Evening' : 'Clear'}</dt><dd>{dark ? '#101113' : '#FFFFFF'}</dd></div><div><dt>Mist</dt><dd>{dark ? '#191B1D' : '#F6F6F5'}</dd></div></dl>
          </section>
        </section>
        <section className="serein-example" aria-label="Live component example">
          <div className="serein-example-label"><span>Live preview</span><span>Changes stay in this page</span></div>
          <Card className="serein-delivery">
            <div className="serein-card-heading"><div><h2 id="delivery-title" tabIndex={-1}>Delivery settings</h2><p>A little less noise. The updates you need.</p></div><Badge>Draft</Badge></div>
            <form noValidate onSubmit={event => {
              event.preventDefault(); setValidated(true);
              if (name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) void action.run();
            }}>
              <TextField label="Workspace name" value={name} onChange={event => { setName(event.target.value); action.reset(); }} error={nameError}/>
              <TextField label="Email address" type="email" value={email} onChange={event => { setEmail(event.target.value); action.reset(); }} error={emailError} description="Demo only. No email is sent."/>
              <Select label="Summary frequency" value={frequency} onValueChange={setFrequency} options={[{ value: 'daily', label: 'Every day' }, { value: 'weekly', label: 'Once a week' }, { value: 'monthly', label: 'Once a month' }]}/>
              <div className="serein-preferences"><Switch label="Email summaries" description="Keep your workspace in view." checked={summaries} onCheckedChange={setSummaries}/><Checkbox label="Include project notes" checked={includeNotes} onCheckedChange={setIncludeNotes}/></div>
              <div className="serein-form-actions"><Button type="submit" loading={action.state === 'pending'}><span>{action.state === 'pending' ? 'Sending preview' : 'Send test email'}</span>{action.state !== 'pending' && <Arrow/>}</Button>{action.state === 'pending' ? <Button variant="quiet" onClick={action.cancel}>Cancel</Button> : <Dialog triggerLabel="Review changes" title="Ready for a quieter inbox?" description="These settings are a local preview. Nothing will be sent or stored." confirmLabel="Done" onConfirm={() => setMenuFeedback('Review complete. Nothing was sent or saved.')}><dl className="serein-review"><div><dt>Workspace</dt><dd>{name || 'Untitled'}</dd></div><div><dt>Frequency</dt><dd>{frequency}</dd></div><div><dt>Summaries</dt><dd>{summaries ? 'On' : 'Off'}</dd></div></dl></Dialog>}</div>
            </form>
          </Card>
          <div className="serein-status" data-state={action.state}><span className="serein-status-symbol"><StatusIcon state={action.state} kind="send" size={24}/></span><div><p role="status">{message}</p><span>Purposeful motion, from action to answer.</span></div></div>
        </section>
      </div>
      <section className="serein-detail-study" aria-label="Component details">
        <div className="serein-type"><span aria-hidden="true">Aa</span><div><h2>Plus Jakarta Sans</h2><p>Clear at every size.<br/>Regular · Medium · Semibold</p></div></div>
        <div className="serein-feedback-study"><h2>Small signals. Clear meaning.</h2><div className="serein-action-row"><Badge tone="success">Delivered</Badge><Badge tone="warning">Pending</Badge><Badge tone="error">Needs attention</Badge></div><p>Colour supports the message; words carry it.</p></div>
        <div className="serein-menu-study"><DropdownMenu triggerLabel="Workspace actions" items={[{ label: 'About this preview', onSelect: () => setMenuFeedback('Changes stay on this page and reset when you reload. Nothing is sent or saved.') }, { label: 'Reset settings', onSelect: () => { setName('Studio workspace'); setEmail('hello@example.com'); setFrequency('weekly'); setSummaries(true); setIncludeNotes(false); setValidated(false); action.reset(); setMenuFeedback('Settings reset.'); } }]}/><p role="status">{menuFeedback || 'Try the menu, or Tab through the controls.'}</p></div>
      </section>
    </main>
    <footer className="serein-footer"><span>Serein · React component library</span><a href="?view=catalogue#foundations">Foundations & accessibility</a><span>Beta · Local demonstration</span></footer>
  </div>;
}
