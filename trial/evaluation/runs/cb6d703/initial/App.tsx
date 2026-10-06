import { FormEvent, useEffect, useRef, useState } from 'react';
import { setupDefaults, workTypes, type Setup } from '../../shared/fixtures';
import { finishSetup } from '../../shared/service';
import './app.css';

type Step = 1 | 2 | 3;

const steps = [
  { number: 1, label: 'Workspace' },
  { number: 2, label: 'Preferences' },
  { number: 3, label: 'Review' },
] as const;

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [setup, setSetup] = useState<Setup>({ ...setupDefaults });
  const [nameError, setNameError] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'complete'>('idle');
  const [serviceError, setServiceError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const retryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === 'error') retryRef.current?.focus();
  }, [status]);

  const moveTo = (next: Step) => {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const validateName = () => {
    const trimmed = setup.studioName.trim();
    if (!trimmed) {
      setNameError('Enter a studio name to continue.');
      requestAnimationFrame(() => nameRef.current?.focus());
      return false;
    }
    setSetup((value) => ({ ...value, studioName: trimmed }));
    setNameError('');
    return true;
  };

  const continueFromWorkspace = (event: FormEvent) => {
    event.preventDefault();
    if (validateName()) moveTo(2);
  };

  const finish = async () => {
    if (status === 'pending') return;
    setStatus('pending');
    setServiceError('');
    try {
      await finishSetup(setup);
      setStatus('complete');
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch (error) {
      setServiceError(error instanceof Error ? error.message : 'Completion failed. Please retry.');
      setStatus('error');
    }
  };

  const restart = () => {
    setSetup({ ...setupDefaults });
    setNameError('');
    setServiceError('');
    setStatus('idle');
    setStep(1);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const isPending = status === 'pending';
  const currentLabel = steps[step - 1].label;

  return (
    <main className="page-shell">
      <section className="setup-card" aria-label="Studio setup demo">
        <aside className="progress-panel">
          <div className="brand" aria-label="Northstar Studio">
            <span className="brand-mark">N</span>
            <span>Northstar</span>
          </div>
          <div className="progress-copy">
            <p className="eyebrow">Local setup demo</p>
            <h2>Shape your workspace</h2>
            <p>A short preview of how your studio could be configured.</p>
          </div>
          <nav aria-label="Setup progress">
            <ol className="steps">
              {steps.map((item) => {
                const complete = status === 'complete' || step > item.number;
                const current = status !== 'complete' && step === item.number;
                return (
                  <li className={current ? 'current' : complete ? 'done' : ''} key={item.number}>
                    <span className="step-marker" aria-hidden="true">{complete ? '✓' : item.number}</span>
                    <span className="step-text">
                      <span>{item.label}</span>
                      <small>{complete ? 'Completed' : current ? 'Current step' : 'Up next'}</small>
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>
          <p className="privacy-note">No account is created. Reloading clears this demo state.</p>
        </aside>

        <div className="content-panel">
          {status === 'complete' ? (
            <div className="completion">
              <span className="success-icon" aria-hidden="true">✓</span>
              <p className="eyebrow">Demo complete</p>
              <h1 ref={headingRef} tabIndex={-1}>Your workspace is ready</h1>
              <p className="lead">The setup for <strong>{setup.studioName}</strong> was completed in this local demo.</p>
              <div className="summary-strip">
                <span>{setup.workType}</span>
                <span>{setup.digest ? 'Weekly summary on' : 'Weekly summary off'}</span>
              </div>
              <button className="primary-button" type="button" onClick={restart}>Restart setup</button>
              <p className="fine-print">This is fictional, simulated data. Nothing was saved and no account was created.</p>
            </div>
          ) : (
            <>
              <header className="content-header">
                <div>
                  <p className="eyebrow">Step {step} of 3 · {currentLabel}</p>
                  <h1 ref={headingRef} tabIndex={-1}>
                    {step === 1 ? 'Name your workspace' : step === 2 ? 'Choose your updates' : 'Review your setup'}
                  </h1>
                  <p className="lead">
                    {step === 1 && 'Start with the details your collaborators will recognize.'}
                    {step === 2 && 'Decide whether you want a compact weekly activity recap.'}
                    {step === 3 && 'Make sure everything looks right before finishing the demo.'}
                  </p>
                </div>
                <span className="step-count" aria-hidden="true">0{step} / 03</span>
              </header>

              {step === 1 && (
                <form onSubmit={continueFromWorkspace} noValidate>
                  <div className="field">
                    <div className="label-row">
                      <label htmlFor="studio-name">Studio name</label>
                      <span>{setup.studioName.length}/60</span>
                    </div>
                    <input
                      id="studio-name"
                      ref={nameRef}
                      value={setup.studioName}
                      maxLength={60}
                      onChange={(event) => {
                        setSetup({ ...setup, studioName: event.target.value });
                        if (nameError) setNameError('');
                      }}
                      aria-invalid={Boolean(nameError)}
                      aria-describedby={nameError ? 'name-error name-help' : 'name-help'}
                      autoComplete="organization"
                    />
                    <p id="name-help" className="field-help">Use the name you share with clients.</p>
                    {nameError && <p id="name-error" className="field-error" role="alert">{nameError}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="work-type">Work type</label>
                    <select id="work-type" value={setup.workType} onChange={(event) => setSetup({ ...setup, workType: event.target.value })}>
                      {workTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </div>
                  <div className="actions end"><button className="primary-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={(event) => { event.preventDefault(); moveTo(3); }}>
                  <label className="choice-card">
                    <span className="choice-copy">
                      <span className="choice-title">Weekly summary</span>
                      <span>Receive a brief recap of studio activity every Friday.</span>
                    </span>
                    <input type="checkbox" checked={setup.digest} onChange={(event) => setSetup({ ...setup, digest: event.target.checked })} />
                    <span className="switch" aria-hidden="true"><span /></span>
                  </label>
                  <p className="demo-callout"><span aria-hidden="true">i</span> This preference is only used for the local demo.</p>
                  <div className="actions"><button className="secondary-button" type="button" onClick={() => moveTo(1)}>Back</button><button className="primary-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
                </form>
              )}

              {step === 3 && (
                <div>
                  <dl className="review-list">
                    <div><dt>Studio name</dt><dd>{setup.studioName}</dd></div>
                    <div><dt>Work type</dt><dd>{setup.workType}</dd></div>
                    <div><dt>Weekly summary</dt><dd><span className={`status-dot ${setup.digest ? 'on' : ''}`} />{setup.digest ? 'On' : 'Off'}</dd></div>
                  </dl>
                  {status === 'error' && (
                    <div className="error-banner" role="alert">
                      <span aria-hidden="true">!</span>
                      <div><strong>We couldn’t complete the demo</strong><p>{serviceError}</p></div>
                    </div>
                  )}
                  <div className="actions">
                    <button className="secondary-button" type="button" onClick={() => { setStatus('idle'); setServiceError(''); moveTo(2); }} disabled={isPending}>Back</button>
                    <button ref={retryRef} className="primary-button" type="button" onClick={finish} disabled={isPending} aria-describedby={status === 'error' ? 'retry-help' : undefined}>
                      {isPending ? <><span className="spinner" aria-hidden="true" />Completing…</> : status === 'error' ? 'Retry completion' : 'Finish demo setup'}
                    </button>
                  </div>
                  {status === 'error' && <p id="retry-help" className="retry-help">Your choices are still here. Try again to complete.</p>}
                  <p className="fine-print centered">Finishing simulates setup only. No account is created.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
