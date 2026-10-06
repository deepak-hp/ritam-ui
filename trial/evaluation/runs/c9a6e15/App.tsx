import { FormEvent, useEffect, useRef, useState } from 'react';
import { setupDefaults, workTypes, type Setup } from '../../shared/fixtures';
import { finishSetup } from '../../shared/service';
import './app.css';

type Step = 1 | 2 | 3;
type Status = 'idle' | 'pending' | 'error' | 'complete';

const steps = [
  { number: 1, label: 'Workspace' },
  { number: 2, label: 'Preferences' },
  { number: 3, label: 'Review' },
] as const;

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<Setup>({ ...setupDefaults });
  const [nameError, setNameError] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [serviceError, setServiceError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (status === 'complete') contentRef.current?.focus();
    else if (step > 1) contentRef.current?.focus();
  }, [step, status]);

  function updateName(value: string) {
    setValues(current => ({ ...current, studioName: value }));
    if (nameError && value.trim()) setNameError('');
  }

  function continueFromWorkspace(event: FormEvent) {
    event.preventDefault();
    const trimmed = values.studioName.trim();
    if (!trimmed) {
      setNameError('Enter a studio name to continue.');
      nameRef.current?.focus();
      return;
    }
    setValues(current => ({ ...current, studioName: trimmed }));
    setNameError('');
    setStep(2);
  }

  async function completeSetup() {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus('pending');
    setServiceError('');
    try {
      await finishSetup(values);
      setStatus('complete');
    } catch (error) {
      setStatus('error');
      setServiceError(error instanceof Error ? error.message : 'Completion failed. Please retry.');
    } finally {
      inFlight.current = false;
    }
  }

  function restart() {
    setValues({ ...setupDefaults });
    setNameError('');
    setServiceError('');
    setStatus('idle');
    setStep(1);
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  const locked = status === 'pending';

  return (
    <main className="setup-shell">
      <header className="brand" aria-label="Studio setup">
        <span className="brand-mark" aria-hidden="true">S</span>
        <span>STUDIO/SET</span>
        <span className="demo-tag">LOCAL DEMO</span>
      </header>

      <section className="setup-card" aria-labelledby="page-title">
        {status !== 'complete' && (
          <aside className="progress-panel" aria-label={`Setup progress: step ${step} of 3`}>
            <p className="eyebrow">Get started</p>
            <h1 id="page-title">Set up your studio</h1>
            <p className="intro">A few details to shape your workspace. This is fictional demo data.</p>
            <ol className="steps">
              {steps.map(item => {
                const state = item.number < step ? 'complete' : item.number === step ? 'current' : 'upcoming';
                return (
                  <li key={item.number} className={state} aria-current={state === 'current' ? 'step' : undefined}>
                    <span className="step-dot" aria-hidden="true">
                      {state === 'complete' ? '✓' : item.number}
                    </span>
                    <span>
                      <small>{state === 'complete' ? 'Completed' : `Step ${item.number}`}</small>
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="privacy-note">No account is created. Reloading clears this demo state.</p>
          </aside>
        )}

        <div className={`content-panel ${status === 'complete' ? 'completion-panel' : ''}`} ref={contentRef} tabIndex={-1}>
          {status === 'complete' ? (
            <div className="completion" aria-live="polite">
              <span className="success-mark" aria-hidden="true">✓</span>
              <p className="eyebrow">Demo complete</p>
              <h1 id="page-title">Your workspace is ready</h1>
              <p><strong>{values.studioName}</strong> is set up for {values.workType.toLowerCase()} work.</p>
              <dl className="completion-details">
                <div><dt>Weekly summary</dt><dd>{values.digest ? 'On' : 'Off'}</dd></div>
                <div><dt>Storage</dt><dd>Local session only</dd></div>
              </dl>
              <button className="primary-button" type="button" onClick={restart}>Restart setup</button>
              <p className="fine-print">This was a simulated setup. No account or workspace was created.</p>
            </div>
          ) : step === 1 ? (
            <form onSubmit={continueFromWorkspace} noValidate>
              <p className="step-kicker">01 / Workspace</p>
              <h2>Tell us about your studio</h2>
              <p className="lead">Name the space and choose the kind of work you do most.</p>

              <div className="field-group">
                <label htmlFor="studio-name">Studio name</label>
                <input
                  ref={nameRef}
                  id="studio-name"
                  value={values.studioName}
                  onChange={event => updateName(event.target.value)}
                  maxLength={60}
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? 'name-error name-hint' : 'name-hint'}
                  autoComplete="organization"
                  autoFocus
                />
                <div className="field-meta">
                  <span id={nameError ? 'name-error' : 'name-hint'} className={nameError ? 'error-text' : ''}>
                    {nameError || 'Required · up to 60 characters'}
                  </span>
                  <span aria-hidden="true">{values.studioName.length}/60</span>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="work-type">Work type</label>
                <select id="work-type" value={values.workType} onChange={event => setValues(current => ({ ...current, workType: event.target.value }))}>
                  {workTypes.map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div className="actions end"><button className="primary-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
            </form>
          ) : step === 2 ? (
            <div>
              <p className="step-kicker">02 / Preferences</p>
              <h2>Stay in the loop</h2>
              <p className="lead">Choose whether you want a concise weekly overview in this demo.</p>
              <label className="choice-card">
                <input type="checkbox" checked={values.digest} onChange={event => setValues(current => ({ ...current, digest: event.target.checked }))} />
                <span className="check-ui" aria-hidden="true">✓</span>
                <span><strong>Weekly summary</strong><small>A roundup of workspace activity, delivered once a week.</small></span>
              </label>
              <div className="actions">
                <button className="secondary-button" type="button" onClick={() => setStep(1)}>Back</button>
                <button className="primary-button" type="button" onClick={() => setStep(3)}>Review setup <span aria-hidden="true">→</span></button>
              </div>
            </div>
          ) : (
            <div>
              <p className="step-kicker">03 / Review</p>
              <h2>Everything look right?</h2>
              <p className="lead">Review your choices before completing the simulated setup.</p>
              <dl className="review-list">
                <div><dt>Studio name</dt><dd>{values.studioName}</dd></div>
                <div><dt>Work type</dt><dd>{values.workType}</dd></div>
                <div><dt>Weekly summary</dt><dd>{values.digest ? 'On' : 'Off'}</dd></div>
              </dl>
              {status === 'error' && (
                <div className="error-banner" role="alert">
                  <span aria-hidden="true">!</span>
                  <div><strong>Couldn’t complete setup</strong><p>{serviceError}</p></div>
                </div>
              )}
              <div className="actions">
                <button className="secondary-button" type="button" onClick={() => setStep(2)} disabled={locked}>Back</button>
                <button className="primary-button" type="button" onClick={completeSetup} disabled={locked} aria-describedby="finish-note">
                  {locked ? <><span className="spinner" aria-hidden="true" /> Finishing…</> : status === 'error' ? 'Retry completion' : 'Finish demo setup'}
                </button>
              </div>
              <p className="finish-note" id="finish-note">No account will be created.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
