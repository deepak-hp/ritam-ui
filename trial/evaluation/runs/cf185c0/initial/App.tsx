import { useRef, useState } from 'react';
import { Button, Checkbox, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { setupDefaults, workTypes, type Setup } from '../../shared/fixtures';
import { finishSetup } from '../../shared/service';
import './app.css';

const steps = ['Workspace', 'Preferences', 'Review'];

function focusElement(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

function validateStudioName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter a studio name.';
  if (trimmed.length > 60) return 'Use 60 characters or fewer.';
  return '';
}

export default function App() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Setup>({ ...setupDefaults });
  const [nameError, setNameError] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'complete'>('idle');
  const submitting = useRef(false);
  const pending = status === 'pending';

  function goTo(next: number) {
    setStep(next);
    setStatus('idle');
    focusElement(`step-heading-${next}`);
  }

  function continueFromWorkspace() {
    const error = validateStudioName(draft.studioName);
    setNameError(error);
    if (error) {
      focusElement('studio-name');
      return;
    }
    setDraft(current => ({ ...current, studioName: current.studioName.trim() }));
    goTo(1);
  }

  async function submitSetup() {
    if (submitting.current) return;
    submitting.current = true;
    setStatus('pending');
    try {
      const result = await finishSetup({ ...draft, studioName: draft.studioName.trim() });
      setDraft(result);
      setStatus('complete');
      focusElement('completion-heading');
    } catch {
      setStatus('error');
      focusElement('completion-error');
    } finally {
      submitting.current = false;
    }
  }

  function restart() {
    setDraft({ ...setupDefaults });
    setNameError('');
    setStatus('idle');
    setStep(0);
    focusElement('studio-name');
  }

  const title = ['Shape your workspace', 'Set your rhythm', 'Review your setup'][step];
  const descriptions = [
    'Give this local demo a name and choose the kind of work you do most.',
    'Choose whether the demo should include a weekly summary preference.',
    'Check each choice before running the simulated completion.',
  ];

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to setup</a>
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">S</div>
        <div>
          <span className="eyebrow">Studio setup</span>
          <strong>Local demo</strong>
        </div>
        <span className="demo-badge">Fictional data</span>
      </header>

      <main id="main-content" className="setup-layout">
        <aside className="setup-sidebar" aria-labelledby="setup-title">
          <p className="kicker">Three quick steps</p>
          <h1 id="setup-title">Make this space yours.</h1>
          <p className="sidebar-copy">
            Try the setup flow with fictional choices. No account or real workspace is created.
          </p>

          <ol className="progress-list" aria-label={`Setup progress, step ${step + 1} of 3`}>
            {steps.map((label, index) => (
              <li
                key={label}
                className={index === step ? 'current' : index < step ? 'done' : ''}
                aria-current={index === step ? 'step' : undefined}
              >
                <span className="step-number" aria-hidden="true">{index < step ? '✓' : index + 1}</span>
                <span>
                  <small>{index < step ? 'Completed' : index === step ? 'Current step' : 'Up next'}</small>
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <p className="privacy-note">Reloading this page clears the demo state.</p>
        </aside>

        <section className="content-panel" aria-live="off">
          {status === 'complete' ? (
            <div className="completion-panel">
              <div className="completion-icon" aria-hidden="true">✓</div>
              <p className="kicker">Demo complete</p>
              <h2 id="completion-heading" tabIndex={-1}>{draft.studioName} is ready</h2>
              <p>
                The simulated setup finished successfully. No account was created and nothing was saved.
              </p>
              <dl className="review-grid compact">
                <div><dt>Studio name</dt><dd>{draft.studioName}</dd></div>
                <div><dt>Work type</dt><dd>{draft.workType}</dd></div>
                <div><dt>Weekly summary</dt><dd>{draft.digest ? 'On' : 'Off'}</dd></div>
              </dl>
              <Button onClick={restart}>Restart setup</Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={event => {
                event.preventDefault();
                if (pending) return;
                if (step === 0) continueFromWorkspace();
                else if (step === 1) goTo(2);
                else void submitSetup();
              }}
            >
              <header className="form-heading">
                <span>Step {step + 1} of 3</span>
                <h2 id={`step-heading-${step}`} tabIndex={-1}>{title}</h2>
                <p>{descriptions[step]}</p>
              </header>

              <div className="step-content">
                {step === 0 && (
                  <div className="field-stack">
                    <TextField
                      id="studio-name"
                      label="Studio name"
                      description="Required. Up to 60 characters."
                      value={draft.studioName}
                      error={nameError}
                      maxLength={60}
                      autoComplete="organization"
                      disabled={pending}
                      onChange={event => {
                        const value = event.target.value;
                        setDraft(current => ({ ...current, studioName: value }));
                        if (nameError) setNameError(validateStudioName(value));
                      }}
                    />
                    <Select
                      label="Work type"
                      name="workType"
                      value={draft.workType}
                      options={workTypes.map(value => ({ value, label: value }))}
                      disabled={pending}
                      onValueChange={workType => setDraft(current => ({ ...current, workType }))}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="preference-box">
                    <Checkbox
                      label="Weekly summary"
                      description="Include a weekly summary preference in this demo setup. No emails will be sent."
                      checked={draft.digest}
                      disabled={pending}
                      onCheckedChange={digest => setDraft(current => ({ ...current, digest }))}
                    />
                  </div>
                )}

                {step === 2 && (
                  <>
                    <dl className="review-grid">
                      <div><dt>Studio name</dt><dd>{draft.studioName}</dd></div>
                      <div><dt>Work type</dt><dd>{draft.workType}</dd></div>
                      <div><dt>Weekly summary</dt><dd>{draft.digest ? 'On' : 'Off'}</dd></div>
                    </dl>
                    <div className="simulation-note">
                      <strong>Simulation only</strong>
                      <p>Finishing calls a local demo service. Its first attempt is designed to fail so you can retry without losing choices.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="form-footer">
                <div className="actions">
                  {step > 0 && (
                    <Button type="button" variant="secondary" disabled={pending} onClick={() => goTo(step - 1)}>
                      Back
                    </Button>
                  )}
                  <Button type="submit" loading={pending} disabled={pending}>
                    {step < 2 ? 'Continue' : status === 'error' ? 'Retry completion' : 'Finish demo setup'}
                  </Button>
                </div>
                <div className="status-region" aria-live="polite">
                  {pending && <p role="status">Completing the simulated setup…</p>}
                  {status === 'error' && (
                    <p id="completion-error" className="error-message" role="alert" tabIndex={-1}>
                      The simulated completion failed. Your choices are still here. Retry completion.
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </section>
      </main>
      <footer className="page-footer">Local demonstration · Fictional data · Reload clears all choices</footer>
    </div>
  );
}
