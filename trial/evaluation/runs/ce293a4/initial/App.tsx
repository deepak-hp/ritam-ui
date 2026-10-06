import { useMemo, useRef, useState, type FormEvent } from 'react';
import { Button, Checkbox, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { digests, settingsDefaults, timezones, type Settings } from '../../shared/fixtures';
import { saveSettings } from '../../shared/service';
import './app.css';

type SaveState = 'idle' | 'pending' | 'error' | 'success';

function sameSettings(a: Settings, b: Settings) {
  return a.displayName === b.displayName
    && a.timezone === b.timezone
    && a.digest === b.digest
    && a.productUpdates === b.productUpdates;
}

function displayNameError(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter a display name.';
  if (trimmed.length > 60) return 'Use 60 characters or fewer.';
  return '';
}

export default function App() {
  const [saved, setSaved] = useState<Settings>(() => ({ ...settingsDefaults }));
  const [draft, setDraft] = useState<Settings>(() => ({ ...settingsDefaults }));
  const [nameError, setNameError] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const nameRef = useRef<HTMLInputElement>(null);

  const dirty = useMemo(() => !sameSettings(draft, saved), [draft, saved]);
  const pending = saveState === 'pending';

  function update(patch: Partial<Settings>) {
    setDraft(current => ({ ...current, ...patch }));
    if (patch.displayName !== undefined && nameError) {
      setNameError(displayNameError(patch.displayName));
    }
    if (saveState === 'success') setSaveState('idle');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const error = displayNameError(draft.displayName);
    setNameError(error);
    if (error) {
      nameRef.current?.focus();
      return;
    }

    const next = { ...draft, displayName: draft.displayName.trim() };
    setSaveState('pending');
    try {
      const result = await saveSettings(next);
      setSaved(result);
      setDraft(result);
      setSaveState('success');
    } catch {
      setSaveState('error');
    }
  }

  function reset() {
    setDraft({ ...saved });
    setNameError('');
    setSaveState('idle');
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  return (
    <div className="settings-page">
      <header className="topbar">
        <a className="brand" href="#main">Flame <span>&amp;</span> Ink</a>
        <span className="demo-badge">Fictional demo</span>
      </header>

      <main id="main" className="main-shell">
        <header className="page-heading">
          <p className="eyebrow">Studio preferences</p>
          <h1>Settings</h1>
          <p>Choose how your name, region, and updates appear in this local demonstration.</p>
        </header>

        <section className="settings-panel" aria-labelledby="settings-form-title">
          <div className="panel-heading">
            <div>
              <h2 id="settings-form-title">Workspace settings</h2>
              <p>Changes stay as drafts until you save them.</p>
            </div>
            <span className={`change-indicator ${dirty ? 'is-dirty' : ''}`}>
              <span aria-hidden="true" />
              {dirty ? 'Unsaved changes' : 'Up to date'}
            </span>
          </div>

          <form noValidate onSubmit={submit}>
            <fieldset disabled={pending}>
              <legend>Profile &amp; region</legend>
              <p className="group-description">Details used to personalize this demo workspace.</p>
              <div className="field-grid">
                <TextField
                  ref={nameRef}
                  id="display-name"
                  label="Display name"
                  description="Required, up to 60 characters."
                  error={nameError}
                  value={draft.displayName}
                  onChange={event => update({ displayName: event.target.value })}
                  maxLength={60}
                  required
                  autoComplete="name"
                  disabled={pending}
                />
                <Select
                  label="Time zone"
                  description="Used for dates and scheduled summaries."
                  value={draft.timezone}
                  onValueChange={timezone => update({ timezone })}
                  options={timezones.map(timezone => ({ value: timezone, label: timezone }))}
                  disabled={pending}
                  name="timezone"
                />
              </div>
            </fieldset>

            <fieldset disabled={pending}>
              <legend>Communications</legend>
              <p className="group-description">Set the cadence and topics you want included.</p>
              <div className="field-grid">
                <Select
                  label="Digest frequency"
                  description="How often to prepare a studio activity summary."
                  value={draft.digest}
                  onValueChange={digest => update({ digest })}
                  options={digests.map(digest => ({ value: digest, label: digest }))}
                  disabled={pending}
                  name="digest"
                />
                <div className="checkbox-wrap">
                  <Checkbox
                    label="Product updates"
                    description="Include occasional news about fictional product improvements. No messages are sent."
                    checked={draft.productUpdates}
                    onCheckedChange={productUpdates => update({ productUpdates })}
                    disabled={pending}
                    name="productUpdates"
                  />
                </div>
              </div>
            </fieldset>

            <div className="form-footer">
              <div className="actions">
                <Button type="submit" loading={pending} disabled={pending || (!dirty && saveState !== 'error')}>
                  {saveState === 'error' ? 'Retry save' : 'Save settings'}
                </Button>
                <Button type="button" variant="secondary" onClick={reset} disabled={pending || !dirty}>
                  Reset changes
                </Button>
              </div>

              <div className="status-area" aria-live="polite" aria-atomic="true">
                {pending && <p className="status pending"><span aria-hidden="true" /> Saving settings…</p>}
                {saveState === 'success' && <p className="status success"><span aria-hidden="true">✓</span> Settings saved in memory.</p>}
                {saveState === 'error' && (
                  <p className="status error" role="alert">
                    <span aria-hidden="true">!</span> Save failed in this simulation. Your draft is still here; retry to save.
                  </p>
                )}
                {saveState === 'idle' && dirty && <p className="status neutral">Review your changes, then save.</p>}
                {saveState === 'idle' && !dirty && <p className="status neutral">No unsaved changes.</p>}
              </div>
            </div>
          </form>
        </section>

        <aside className="demo-note" aria-label="Demo storage note">
          <span aria-hidden="true">i</span>
          <p><strong>Local demo only.</strong> Saving is simulated. Successful values remain in memory until this page reloads.</p>
        </aside>
      </main>
    </div>
  );
}
