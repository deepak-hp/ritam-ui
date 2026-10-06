import { useState, type FormEvent } from 'react';
import { Button, Checkbox, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { setupDefaults, workTypes, type Setup } from '../../shared/fixtures';
import { finishSetup } from '../../shared/service';
import './app.css';

const steps = [
  { number: '01', name: 'Workspace', detail: 'Name your studio' },
  { number: '02', name: 'Preferences', detail: 'Choose your updates' },
  { number: '03', name: 'Review', detail: 'Confirm your choices' },
];

function focusAfterPaint(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

function nameError(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter a studio name.';
  if (trimmed.length > 60) return 'Use 60 characters or fewer.';
  return '';
}

export default function App() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Setup>({ ...setupDefaults });
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'complete'>('idle');

  const pending = status === 'pending';

  function moveTo(next: number) {
    setStep(next);
    setStatus('idle');
    focusAfterPaint('step-heading');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (step === 0) {
      const message = nameError(draft.studioName);
      setError(message);
      if (message) {
        focusAfterPaint('studio-name');
        return;
      }
      setDraft(current => ({ ...current, studioName: current.studioName.trim() }));
      moveTo(1);
      return;
    }

    if (step === 1) {
      moveTo(2);
      return;
    }

    setStatus('pending');
    try {
      const completed = await finishSetup({ ...draft, studioName: draft.studioName.trim() });
      setDraft(completed);
      setStatus('complete');
      focusAfterPaint('complete-heading');
    } catch {
      setStatus('error');
      focusAfterPaint('completion-error');
    }
  }

  function restart() {
    setDraft({ ...setupDefaults });
    setError('');
    setStatus('idle');
    setStep(0);
    focusAfterPaint('step-heading');
  }

  return (
    <div className="setup-page">
      <a className="skip-link" href="#setup-main">Skip to setup</a>
      <header className="topbar">
        <div className="brand-mark" aria-label="Formline Studio">
          <span aria-hidden="true">F</span>
          <strong>Formline</strong>
        </div>
        <span className="demo-pill">Local demo</span>
      </header>

      <main id="setup-main" className="setup-layout">
        <aside className="context-panel" aria-labelledby="setup-title">
          <p className="eyebrow">Studio setup</p>
          <h1 id="setup-title">A clear start for your next project.</h1>
          <p className="lede">Three quick steps shape this fictional workspace. No account is created, and reloading clears all demo state.</p>

          <ol className="step-list" aria-label="Setup progress">
            {steps.map((item, index) => {
              const current = index === step && status !== 'complete';
              const done = index < step || status === 'complete';
              return (
                <li key={item.name} className={current ? 'current' : done ? 'done' : ''} aria-current={current ? 'step' : undefined}>
                  <span className="step-index" aria-hidden="true">{done ? '✓' : item.number}</span>
                  <span><strong>{item.name}</strong><small>{done ? 'Complete' : item.detail}</small></span>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="work-panel" aria-label="Setup form">
          {status === 'complete' ? (
            <div className="complete-state">
              <span className="success-mark" aria-hidden="true">✓</span>
              <p className="eyebrow">Setup complete</p>
              <h2 id="complete-heading" tabIndex={-1}>{draft.studioName} is ready.</h2>
              <p>Your fictional studio setup finished successfully. This result exists only on this page; no account or workspace was created.</p>
              <dl className="review-list compact">
                <div><dt>Work type</dt><dd>{draft.workType}</dd></div>
                <div><dt>Weekly summary</dt><dd>{draft.digest ? 'On' : 'Off'}</dd></div>
              </dl>
              <Button variant="secondary" onClick={restart}>Restart setup</Button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} aria-busy={pending}>
              <div className="form-heading">
                <p className="step-count">Step {step + 1} of 3</p>
                <h2 id="step-heading" tabIndex={-1}>
                  {step === 0 ? 'Tell us about your studio' : step === 1 ? 'Choose your preferences' : 'Review your setup'}
                </h2>
                <p>
                  {step === 0 && 'Start with the details that identify your workspace.'}
                  {step === 1 && 'Decide whether this demo should include a weekly summary preference.'}
                  {step === 2 && 'Check each choice before completing the simulated setup.'}
                </p>
              </div>

              <div className="form-body">
                {step === 0 && (
                  <div className="field-stack">
                    <TextField
                      id="studio-name"
                      label="Studio name"
                      description="Required. Up to 60 characters."
                      value={draft.studioName}
                      maxLength={60}
                      autoComplete="organization"
                      disabled={pending}
                      error={error}
                      onChange={event => {
                        const studioName = event.target.value;
                        setDraft(current => ({ ...current, studioName }));
                        if (error) setError(nameError(studioName));
                      }}
                    />
                    <Select
                      label="Work type"
                      description="Choose the kind of work your studio does most often."
                      value={draft.workType}
                      options={workTypes.map(value => ({ value, label: value }))}
                      disabled={pending}
                      onValueChange={workType => setDraft(current => ({ ...current, workType }))}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="preference-card">
                    <div>
                      <span className="preference-icon" aria-hidden="true">↗</span>
                    </div>
                    <Checkbox
                      label="Weekly summary"
                      description="Keep a weekly summary preference in this demo. No messages will be sent."
                      checked={draft.digest}
                      disabled={pending}
                      onCheckedChange={digest => setDraft(current => ({ ...current, digest }))}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <dl className="review-list">
                      <div><dt>Studio name</dt><dd>{draft.studioName}</dd></div>
                      <div><dt>Work type</dt><dd>{draft.workType}</dd></div>
                      <div><dt>Weekly summary</dt><dd>{draft.digest ? 'On' : 'Off'}</dd></div>
                    </dl>
                    <div className="demo-notice">
                      <strong>Demo only</strong>
                      <p>Completion is simulated locally. No account is created, nothing is saved, and reload clears these choices.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div id="completion-error" className="error-notice" role="alert" tabIndex={-1}>
                    <strong>Setup could not be completed.</strong>
                    <p>Your choices are still here. This demo fails on its first attempt; retry to finish.</p>
                  </div>
                )}

                <div className="form-actions">
                  {step > 0 && <Button type="button" variant="secondary" disabled={pending} onClick={() => moveTo(step - 1)}>Back</Button>}
                  <Button type="submit" loading={pending} disabled={pending}>
                    {step < 2 ? 'Continue' : status === 'error' ? 'Retry completion' : 'Finish demo setup'}
                  </Button>
                </div>
                <p className="live-status" role="status" aria-live="polite">
                  {pending ? 'Completing your demo setup…' : ''}
                </p>
              </div>
            </form>
          )}
        </section>
      </main>

      <footer>Fictional data · Simulated setup · No persistence</footer>
    </div>
  );
}
