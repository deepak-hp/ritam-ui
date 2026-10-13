import { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Textarea,
} from '@serein-ui/react';
import '@serein-ui/react/styles.css';
import { getAssets, submitDecision, type Asset, type Decision } from '../../shared/service';
import './app.css';

const statusTone = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  blocked: 'neutral',
} as const;

const kindMark: Record<string, string> = {
  Image: 'IMG',
  Video: 'VID',
  Document: 'DOC',
  Audio: 'AUD',
};

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(() => getAssets());
  const [selected, setSelected] = useState<string[]>([]);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState('');
  const [success, setSuccess] = useState('');
  const [failedPayload, setFailedPayload] = useState<Decision | null>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const pendingAssets = useMemo(
    () => assets.filter((asset) => asset.status === 'pending'),
    [assets],
  );
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const allSelected = pendingAssets.length > 0 && pendingAssets.every((asset) => selectedSet.has(asset.id));
  const someSelected = selected.length > 0 && !allSelected;

  function toggleAsset(id: string, checked: boolean) {
    const asset = assets.find((item) => item.id === id);
    if (!asset || asset.status !== 'pending' || pending) return;
    setSelected((current) => checked
      ? [...new Set([...current, id])]
      : current.filter((selectedId) => selectedId !== id));
    setFailure('');
    setFailedPayload(null);
  }

  function toggleAll(checked: boolean) {
    if (pending) return;
    setSelected(checked ? pendingAssets.map((asset) => asset.id) : []);
    setFailure('');
    setFailedPayload(null);
  }

  async function runDecision(payload: Decision) {
    if (pending) return;
    const eligible = payload.ids.length > 0 && payload.ids.every((id) =>
      assets.some((asset) => asset.id === id && asset.status === 'pending'));
    if (!eligible || (payload.decision === 'rejected' && !payload.reason.trim())) return;

    setPending(true);
    setFailure('');
    setSuccess('');
    try {
      const updated = await submitDecision(payload);
      setAssets(updated);
      setSelected([]);
      setFailedPayload(null);
      setRejecting(false);
      setReason('');
      setReasonError('');
      setSuccess(`${payload.ids.length} ${payload.ids.length === 1 ? 'file' : 'files'} ${payload.decision}.`);
    } catch (error) {
      setFailedPayload({ ...payload, ids: [...payload.ids] });
      setFailure(error instanceof Error ? error.message : 'The review could not be completed.');
    } finally {
      setPending(false);
    }
  }

  function approve() {
    void runDecision({ ids: [...selected], decision: 'approved', reason: '' });
  }

  function openRejection() {
    setRejecting(true);
    setReasonError('');
    setFailure('');
    setFailedPayload(null);
    requestAnimationFrame(() => reasonRef.current?.focus());
  }

  function confirmRejection() {
    if (!reason.trim()) {
      setReasonError('Enter a reason before rejecting these files.');
      reasonRef.current?.focus();
      return;
    }
    setReasonError('');
    void runDecision({ ids: [...selected], decision: 'rejected', reason: reason.trim() });
  }

  return (
    <main className="workspace">
      <header className="masthead">
        <div className="brand-lockup" aria-label="Ember Studio review desk">
          <span className="brand-mark" aria-hidden="true">E</span>
          <span>EMBER STUDIO <b>/ REVIEW DESK</b></span>
        </div>
        <span className="demo-pill">Demo data</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Creative operations</p>
          <h1 id="page-title">File review</h1>
          <p className="lede">Review the latest handoff and move approved work forward.</p>
        </div>
        <div className="summary" aria-label="Review summary">
          <div><strong>{pendingAssets.length}</strong><span>Awaiting review</span></div>
          <div><strong>{assets.filter((asset) => asset.status === 'approved').length}</strong><span>Approved</span></div>
          <div><strong>{assets.filter((asset) => asset.status === 'blocked').length}</strong><span>Blocked</span></div>
        </div>
      </section>

      <section className="review-panel" aria-labelledby="files-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Current handoff</p>
            <h2 id="files-heading">Creative files</h2>
          </div>
          <p>{assets.length} files · {pendingAssets.length} need a decision</p>
        </div>

        <div className="bulk-row">
          <Checkbox
            label="Select all pending files"
            checked={allSelected}
            indeterminate={someSelected}
            disabled={pendingAssets.length === 0 || pending}
            onCheckedChange={toggleAll}
          />
          <span>{selected.length === 0 ? 'No files selected' : `${selected.length} selected`}</span>
        </div>

        <div className="table-region" role="region" aria-label="Files for review" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">File</th>
                <th scope="col">Owner</th>
                <th scope="col">Type &amp; size</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const eligible = asset.status === 'pending';
                return (
                  <tr key={asset.id} className={selectedSet.has(asset.id) ? 'is-selected' : ''}>
                    <td data-label="Select">
                      <Checkbox
                        label={`Select ${asset.name}`}
                        checked={selectedSet.has(asset.id)}
                        disabled={!eligible || pending}
                        onCheckedChange={(checked) => toggleAsset(asset.id, checked)}
                      />
                    </td>
                    <td data-label="File">
                      <div className="file-cell">
                        <span className={`file-mark ${asset.kind.toLowerCase()}`} aria-hidden="true">{kindMark[asset.kind]}</span>
                        <div><strong>{asset.name}</strong><span className="mobile-owner">{asset.owner}</span></div>
                      </div>
                    </td>
                    <td data-label="Owner" className="owner-cell">{asset.owner}</td>
                    <td data-label="Type & size"><span>{asset.kind}</span><small>{asset.size}</small></td>
                    <td data-label="Status">
                      <Badge tone={statusTone[asset.status]}>{asset.status[0].toUpperCase() + asset.status.slice(1)}</Badge>
                      {asset.status === 'blocked' && asset.reason && <small className="block-reason">{asset.reason}</small>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="decision-area">
          <div className="selection-copy">
            <strong>{selected.length} selected</strong>
            <span>{selected.length ? 'Ready for a batch decision' : 'Select pending files to continue'}</span>
          </div>
          <div className="actions">
            <Button variant="secondary" disabled={!selected.length || pending} onClick={openRejection}>Reject selected</Button>
            <Button disabled={!selected.length || pending} loading={pending && !rejecting} onClick={approve}>Approve selected</Button>
          </div>
        </div>

        {rejecting && (
          <section className="rejection-panel" aria-labelledby="rejection-heading">
            <div>
              <p className="eyebrow">Send back for changes</p>
              <h3 id="rejection-heading">Why is this work being rejected?</h3>
              <p>The reason stays with this decision so the team knows what to revise.</p>
            </div>
            <Textarea
              ref={reasonRef}
              label="Rejection reason"
              value={reason}
              rows={3}
              disabled={pending}
              error={reasonError || undefined}
              placeholder="Describe the change needed"
              onChange={(event) => { setReason(event.target.value); setReasonError(''); }}
            />
            <div className="actions">
              <Button variant="quiet" disabled={pending} onClick={() => setRejecting(false)}>Cancel rejection</Button>
              <Button disabled={pending} loading={pending} onClick={confirmRejection}>Confirm rejection</Button>
            </div>
          </section>
        )}

        {failure && (
          <div className="feedback">
            <Alert title="Decision not submitted" tone="error" live="assertive">{failure}</Alert>
            <Button variant="secondary" disabled={pending || !failedPayload} onClick={() => failedPayload && void runDecision(failedPayload)}>Retry decision</Button>
          </div>
        )}
        <div className="sr-status" role="status" aria-live="polite">{success}</div>
      </section>
    </main>
  );
}
