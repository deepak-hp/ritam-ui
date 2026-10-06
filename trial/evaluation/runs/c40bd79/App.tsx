import { FormEvent, useRef, useState } from 'react';
import { digests, settingsDefaults, timezones, type Settings } from '../../shared/fixtures';
import { saveSettings } from '../../shared/service';
// @ts-expect-error The isolated evaluation harness has no declaration for CSS imports.
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

  const isSaving = saveState === 'saving';
  const isDirty = !sameSettings(draft, saved);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setDraft(current => ({ ...current, [key]: value }));
    setSaveState('idle');
    if (key === 'displayName' && String(value).trim()) setNameError('');
  }

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (isSaving) return;

    const cleanName = draft.displayName.trim();
    if (!cleanName) {
      setNameError('Enter a display name.');
      setSaveState('idle');
      requestAnimationFrame(() => nameRef.current?.focus());
      return;
    }

    const value = { ...draft, displayName: cleanName };
    setNameError('');
    setSaveState('saving');
    try {
      const result = await saveSettings(value);
      setDraft(result);
      setSaved(result);
      setSaveState('success');
    } catch {
      setSaveState('error');
    }
  }

  function reset() {
    setDraft(saved);
    setNameError('');
    setSaveState('idle');
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="eyebrow"><span aria-hidden="true" /> Studio preferences</div>
        <h1>Settings</h1>
        <p>Choose how your name, time, and updates appear across this local studio demo.</p>
      </header>

      <section className="settings-card" aria-labelledby="preferences-title">
        <div className="card-heading">
          <div>
            <h2 id="preferences-title">Profile &amp; notifications</h2>
            <p>These preferences apply to your studio member profile.</p>
          </div>
          <span className={`change-badge ${isDirty ? 'is-dirty' : ''}`}>
            {isDirty ? 'Unsaved changes' : 'Up to date'}
          </span>
        </div>

        <form onSubmit={submit} noValidate>
          <fieldset disabled={isSaving}>
            <legend className="sr-only">Studio member preferences</legend>

            <div className="field full-field">
              <label htmlFor="display-name">Display name</label>
              <input
                ref={nameRef}
                id="display-name"
                value={draft.displayName}
                maxLength={60}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? 'name-error name-hint' : 'name-hint'}
                onChange={event => update('displayName', event.target.value)}
              />
              <div className="field-meta">
                <span id="name-hint">Shown to collaborators in this demo.</span>
                <span>{draft.displayName.length}/60</span>
              </div>
              {nameError && <p className="field-error" id="name-error">{nameError}</p>}
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="timezone">Time zone</label>
                <select
                  id="timezone"
                  value={draft.timezone}
                  onChange={event => update('timezone', event.target.value)}
                >
                  {timezones.map(zone => <option key={zone}>{zone}</option>)}
                </select>
                <span className="field-note">Used for dates and delivery times.</span>
              </div>

              <div className="field">
                <label htmlFor="digest">Digest frequency</label>
                <select
                  id="digest"
                  value={draft.digest}
                  onChange={event => update('digest', event.target.value)}
                >
                  {digests.map(frequency => <option key={frequency}>{frequency}</option>)}
                </select>
                <span className="field-note">A summary of studio activity.</span>
              </div>
            </div>

            <label className="check-row" htmlFor="product-updates">
              <input
                id="product-updates"
                type="checkbox"
                checked={draft.productUpdates}
                onChange={event => update('productUpdates', event.target.checked)}
              />
              <span>
                <strong>Product updates</strong>
                <small>Occasional news about features and improvements.</small>
              </span>
            </label>
          </fieldset>

          <div className="status-area" aria-live="polite" aria-atomic="true">
            {saveState === 'saving' && <p className="status saving"><span className="spinner" /> Saving your settings…</p>}
            {saveState === 'error' && (
              <div className="status error" role="alert">
                <span><strong>Settings weren’t saved.</strong> Simulated failure; your changes are still here.</span>
                <button type="button" className="retry-button" onClick={() => submit()}>Retry save</button>
              </div>
            )}
            {saveState === 'success' && <p className="status success"><span aria-hidden="true">✓</span> Settings saved for this session.</p>}
          </div>

          <div className="form-actions">
            <p>Saved values are kept in memory until you reload.</p>
            <div className="buttons">
              <button type="button" className="secondary-button" disabled={isSaving || !isDirty} onClick={reset}>Reset changes</button>
              <button type="submit" className="primary-button" disabled={isSaving || !isDirty}>
                {isSaving ? 'Saving…' : 'Save settings'}
              </button>
            </div>
          </div>
        </form>
      </section>

      <p className="demo-note"><span aria-hidden="true">●</span> Fictional demo data · no preferences leave this page</p>
    </main>
  );
}
