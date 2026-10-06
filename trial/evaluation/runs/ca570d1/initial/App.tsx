import { useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Select, TextField } from '@ritam-ui/react';
import '@ritam-ui/react/styles.css';
import { digests, settingsDefaults, timezones, type Settings } from '../../shared/fixtures';
import { saveSettings } from '../../shared/service';
import './app.css';

type SaveState = 'idle' | 'pending' | 'error' | 'success';

function validateDisplayName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter a display name.';
  if (trimmed.length > 60) return 'Use 60 characters or fewer.';
  return '';
}

function initials(name: string) {
  const letters = name.trim().split(/\s+/).map(part => part[0]).filter(Boolean);
  return (letters.slice(0, 2).join('') || 'S').toUpperCase();
}

export default function App() {
  const [saved, setSaved] = useState<Settings>({ ...settingsDefaults });
  const [draft, setDraft] = useState<Settings>({ ...settingsDefaults });
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [nameError, setNameError] = useState('');
  const requestId = useRef(0);
  const pending = saveState === 'pending';
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  function update(next: Settings) {
    setDraft(next);
    if (nameError) setNameError(validateDisplayName(next.displayName));
    if (saveState === 'success') setSaveState('idle');
  }

  async function submit() {
    if (pending) return;
    const error = validateDisplayName(draft.displayName);
    setNameError(error);
    if (error) {
      requestAnimationFrame(() => document.getElementById('display-name')?.focus());
      return;
    }

    const value = { ...draft, displayName: draft.displayName.trim() };
    const activeRequest = ++requestId.current;
    setSaveState('pending');
    try {
      const result = await saveSettings(value);
      if (activeRequest !== requestId.current) return;
      setSaved(result);
      setDraft(result);
      setSaveState('success');
    } catch {
      if (activeRequest === requestId.current) setSaveState('error');
    }
  }

  function reset() {
    setDraft({ ...saved });
    setNameError('');
    setSaveState('idle');
    requestAnimationFrame(() => document.getElementById('display-name')?.focus());
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#main" aria-label="Fieldnote studio settings">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>Fieldnote</span>
        </a>
        <span className="demo-label">Demo workspace</span>
      </header>

      <main id="main" className="settings-layout">
        <aside className="settings-aside" aria-labelledby="settings-title">
          <p className="eyebrow">Studio preferences</p>
          <h1 id="settings-title">Settings that fit your working rhythm.</h1>
          <p className="intro">Update how your name, region, and studio notes appear in this fictional workspace.</p>
          <div className="profile-preview" aria-label="Current draft profile">
            <span className="avatar" aria-hidden="true">{initials(draft.displayName)}</span>
            <div>
              <strong>{draft.displayName.trim() || 'Unnamed member'}</strong>
              <span>{draft.timezone.replace('_', ' ')}</span>
            </div>
          </div>
          <p className="memory-note"><span aria-hidden="true">●</span> Successful changes live in memory only and reset when you reload.</p>
        </aside>

        <section className="settings-panel" aria-labelledby="form-title">
          <div className="panel-heading">
            <div>
              <p className="step-label">Preferences</p>
              <h2 id="form-title">Your studio settings</h2>
            </div>
            <span className={`change-pill ${dirty ? 'is-dirty' : ''}`}>{dirty ? 'Unsaved changes' : 'Up to date'}</span>
          </div>

          <form noValidate onSubmit={event => { event.preventDefault(); void submit(); }}>
            <fieldset disabled={pending}>
              <legend>Identity &amp; region</legend>
              <p className="group-copy">Used to personalize this local demonstration and format regional context.</p>
              <div className="field-stack">
                <TextField
                  id="display-name"
                  label="Display name"
                  value={draft.displayName}
                  onChange={event => update({ ...draft, displayName: event.target.value })}
                  description="Shown to collaborators in this fictional studio. Maximum 60 characters."
                  error={nameError}
                  maxLength={61}
                  autoComplete="name"
                  required
                />
                <Select
                  label="Time zone"
                  value={draft.timezone}
                  onValueChange={timezone => update({ ...draft, timezone })}
                  options={timezones.map(timezone => ({ value: timezone, label: timezone.replace('_', ' ') }))}
                  description="Sets the regional context for dates in the demo."
                  disabled={pending}
                  name="timezone"
                />
              </div>
            </fieldset>

            <fieldset disabled={pending}>
              <legend>Studio updates</legend>
              <p className="group-copy">Choose the cadence and topics you would prefer. No messages are actually sent.</p>
              <div className="field-stack">
                <Select
                  label="Digest frequency"
                  value={draft.digest}
                  onValueChange={digest => update({ ...draft, digest })}
                  options={digests.map(digest => ({ value: digest, label: digest }))}
                  description="How often your simulated studio digest would arrive."
                  disabled={pending}
                  name="digest"
                />
                <div className="checkbox-wrap">
                  <Checkbox
                    label="Product updates"
                    description="Include occasional fictional feature and workflow news."
                    checked={draft.productUpdates}
                    onCheckedChange={productUpdates => update({ ...draft, productUpdates })}
                    disabled={pending}
                    name="productUpdates"
                  />
                </div>
              </div>
            </fieldset>

            <div className="status-area" aria-live="polite" aria-atomic="true">
              {saveState === 'pending' && <p className="status pending"><span className="spinner" aria-hidden="true" />Saving your settings…</p>}
              {saveState === 'error' && <div className="status error" role="alert"><strong>Settings weren’t saved.</strong><span>This simulated attempt failed. Your draft is still here—retry when ready.</span></div>}
              {saveState === 'success' && <div className="status success"><strong>Settings saved.</strong><span>Your latest choices are now the reset point for this session.</span></div>}
              {saveState === 'idle' && <p className="status neutral">{dirty ? 'Your edits are ready to save.' : 'Everything matches your last successful save.'}</p>}
            </div>

            <div className="actions">
              <Button type="submit" loading={pending} disabled={pending}>
                {saveState === 'error' ? 'Retry save' : 'Save settings'}
              </Button>
              <Button type="button" variant="secondary" onClick={reset} disabled={pending || !dirty}>
                Reset changes
              </Button>
            </div>
          </form>
          <p className="fine-print">Fictional demo · Saves are simulated · No backend, account, or persistent storage.</p>
        </section>
      </main>
    </div>
  );
}
