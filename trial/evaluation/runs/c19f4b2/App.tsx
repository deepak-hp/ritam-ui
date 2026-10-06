import { FormEvent, useRef, useState } from 'react';
import { digests, settingsDefaults, timezones, type Settings } from '../../shared/fixtures';
import { saveSettings } from '../../shared/service';
// @ts-expect-error The evaluation harness lets Vite load CSS without a TS module declaration.
import './app.css';

type SaveState = 'idle' | 'saving' | 'error' | 'success';

const sameSettings = (a: Settings, b: Settings) =>
  a.displayName === b.displayName &&
  a.timezone === b.timezone &&
  a.digest === b.digest &&
  a.productUpdates === b.productUpdates;

export default function App() {
  const [saved, setSaved] = useState<Settings>(settingsDefaults);
  const [draft, setDraft] = useState<Settings>(settingsDefaults);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [nameError, setNameError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const dirty = !sameSettings(draft, saved);
  const pending = saveState === 'saving';

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setDraft(current => ({ ...current, [key]: value }));
    if (key === 'displayName') setNameError('');
    if (saveState !== 'idle') setSaveState('idle');
  }

  function reset() {
    setDraft(saved);
    setNameError('');
    setSaveState('idle');
  }

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (pending) return;

    const displayName = draft.displayName.trim();
    if (!displayName) {
      setNameError('Enter a display name.');
      setSaveState('idle');
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }
    if (displayName.length > 60) {
      setNameError('Display name must be 60 characters or fewer.');
      setSaveState('idle');
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }

    const payload = { ...draft, displayName };
    setDraft(payload);
    setNameError('');
    setSaveState('saving');
    try {
      const result = await saveSettings(payload);
      setSaved(result);
      setDraft(result);
      setSaveState('success');
    } catch {
      setSaveState('error');
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <a className="brand" href="#settings" aria-label="Northstar Studio settings">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>Northstar Studio</span>
        </a>
        <span className="demo-badge">Demo workspace</span>
      </header>

      <div className="content-grid">
        <aside className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Workspace preferences</p>
          <h1 id="page-title">Make the studio feel like yours.</h1>
          <p className="lede">
            Choose how your name, local time, and studio updates appear across this fictional demo.
          </p>
          <div className="memory-note">
            <span className="memory-icon" aria-hidden="true">i</span>
            <p><strong>Stored for this session only.</strong> Successful changes live in memory and reset when you reload.</p>
          </div>
        </aside>

        <section className="settings-card" id="settings" aria-labelledby="settings-title">
          <div className="card-heading">
            <div>
              <p className="section-kicker">Personal settings</p>
              <h2 id="settings-title">Profile & notifications</h2>
            </div>
            <span className={`change-state ${dirty ? 'is-dirty' : ''}`}>
              <span aria-hidden="true" />{dirty ? 'Unsaved changes' : 'Up to date'}
            </span>
          </div>

          <form onSubmit={submit} noValidate>
            <fieldset disabled={pending}>
              <legend className="sr-only">Studio member preferences</legend>

              <div className="field-group">
                <div className="group-heading">
                  <span className="group-number">01</span>
                  <div><h3>Your profile</h3><p>Shown to collaborators in this demo workspace.</p></div>
                </div>
                <div className="field">
                  <div className="label-row">
                    <label htmlFor="display-name">Display name</label>
                    <span>{draft.displayName.length}/60</span>
                  </div>
                  <input
                    ref={nameRef}
                    id="display-name"
                    value={draft.displayName}
                    maxLength={80}
                    aria-invalid={Boolean(nameError)}
                    aria-describedby={nameError ? 'name-error name-hint' : 'name-hint'}
                    onChange={event => update('displayName', event.target.value)}
                    autoComplete="name"
                  />
                  {nameError && <p className="field-error" id="name-error" role="alert">{nameError}</p>}
                  <p className="field-hint" id="name-hint">Required · 60 characters maximum</p>
                </div>
              </div>

              <div className="field-group">
                <div className="group-heading">
                  <span className="group-number">02</span>
                  <div><h3>Locale & email</h3><p>Set when and how we package studio news.</p></div>
                </div>
                <div className="paired-fields">
                  <div className="field">
                    <label htmlFor="timezone">Time zone</label>
                    <div className="select-wrap">
                      <select id="timezone" value={draft.timezone} onChange={event => update('timezone', event.target.value)}>
                        {timezones.map(zone => <option key={zone}>{zone}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="digest">Digest frequency</label>
                    <div className="select-wrap">
                      <select id="digest" value={draft.digest} onChange={event => update('digest', event.target.value)}>
                        {digests.map(digest => <option key={digest}>{digest}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <label className="check-row" htmlFor="product-updates">
                  <input
                    id="product-updates"
                    type="checkbox"
                    checked={draft.productUpdates}
                    onChange={event => update('productUpdates', event.target.checked)}
                  />
                  <span className="custom-check" aria-hidden="true" />
                  <span><strong>Product updates</strong><small>Occasional notes about new tools and improvements.</small></span>
                </label>
              </div>
            </fieldset>

            <div className="status-area" aria-live="polite" aria-atomic="true">
              {saveState === 'error' && (
                <div className="save-message error-message">
                  <div><strong>Settings weren’t saved.</strong><span>The simulated service failed. Your changes are still here.</span></div>
                  <button className="retry-button" type="button" onClick={() => void submit()}>Retry save</button>
                </div>
              )}
              {saveState === 'success' && (
                <div className="save-message success-message" role="status">
                  <span className="success-mark" aria-hidden="true">✓</span>
                  <div><strong>Settings saved</strong><span>They’ll stay available until this page reloads.</span></div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button className="secondary-button" type="button" onClick={reset} disabled={pending || !dirty}>Reset changes</button>
              <button className="primary-button" type="submit" disabled={pending || !dirty}>
                {pending ? <><span className="spinner" aria-hidden="true" />Saving…</> : 'Save settings'}
              </button>
            </div>
          </form>
        </section>
      </div>
      <footer><span>Northstar Studio</span><span>Fictional data · Local demo</span></footer>
    </main>
  );
}
