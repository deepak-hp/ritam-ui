import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Textarea,
} from '@serein-ui/react';
import '@serein-ui/react/styles.css';
import { getAssets, submitDecision } from '../../shared/service';
import type { Asset, Decision, ReviewStatus } from '../../shared/service';
import './app.css';

const statusTone: Record<ReviewStatus, 'neutral' | 'success' | 'error' | 'warning'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  blocked: 'neutral',
};

const statusLabel: Record<ReviewStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  blocked: 'Blocked',
};

function App() {
  const [assets, setAssets] = useState<Asset[]>(() => getAssets());
  const [selected, setSelected] = useState<string[]>([]);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [failure, setFailure] = useState('');
  const [failedPayload, setFailedPayload] = useState<Decision | null>(null);
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(false);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const pendingIds = assets.filter((asset) => asset.status === 'pending').map((asset) => asset.id);
  const allPendingSelected = pendingIds.length > 0 && pendingIds.every((id) => selected.includes(id));
  const somePendingSelected = selected.length > 0 && !allPendingSelected;
  const locked = pending || failedPayload !== null;

  const toggleOne = (id: string, checked: boolean) => {
    setSuccess('');
    setSelected((current) => checked ? [...current, id] : current.filter((item) => item !== id));
  };

  const toggleAll = (checked: boolean) => {
    setSuccess('');
    setSelected(checked ? pendingIds : []);
  };

  const runDecision = async (payload: Decision) => {
    if (pending) return;
    setPending(true);
    setFailure('');
    setSuccess('');
    try {
      const updated = await submitDecision(payload);
      setAssets(updated);
      setSelected([]);
      setRejecting(false);
      setReason('');
      setReasonError('');
      setFailedPayload(null);
      const verb = payload.decision === 'approved' ? 'Approved' : 'Rejected';
      setSuccess(`${verb} ${payload.ids.length} ${payload.ids.length === 1 ? 'file' : 'files'}.`);
    } catch (error) {
      setFailedPayload(payload);
      setFailure(error instanceof Error ? error.message : 'The decision could not be submitted.');
    } finally {
      setPending(false);
    }
  };

  const approve = () => {
    if (!selected.length || locked) return;
    setRejecting(false);
    void runDecision({ ids: [...selected], decision: 'approved', reason: '' });
  };

  const confirmReject = () => {
    if (!reason.trim()) {
      setReasonError('Enter a reason before rejecting these files.');
      reasonRef.current?.focus();
      return;
    }
    if (!selected.length || locked) return;
    setReasonError('');
    void runDecision({ ids: [...selected], decision: 'rejected', reason: reason.trim() });
  };

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Creative operations</p>
          <h1>File review</h1>
          <p className="intro">Review the latest handoff and make one clear decision for the selected files.</p>
        </div>
        <span className="demo-label">Demo data</span>
      </header>

      <Card className="review-card">
        <div className="review-summary">
          <div>
            <p className="section-kicker">Review queue</p>
            <h2>{pendingIds.length} files awaiting a decision</h2>
          </div>
          <div className="selection-count" aria-live="polite">
            <strong>{selected.length}</strong>
            <span>selected</span>
          </div>
        </div>

        <div className="bulk-row">
          <Checkbox
            label="Select all pending files"
            checked={allPendingSelected}
            indeterminate={somePendingSelected}
            onCheckedChange={toggleAll}
            disabled={!pendingIds.length || locked}
          />
          <span>Pending files only</span>
        </div>

        <section className="asset-list" aria-label="Files for review">
          <div className="list-head" aria-hidden="true">
            <span>File</span><span>Owner</span><span>Type &amp; size</span><span>Status</span>
          </div>
          {assets.map((asset) => {
            const eligible = asset.status === 'pending';
            return (
              <article className={`asset-row ${selected.includes(asset.id) ? 'is-selected' : ''}`} key={asset.id}>
                <div className="file-cell">
                  <Checkbox
                    label={`Select ${asset.name}`}
                    checked={selected.includes(asset.id)}
                    onCheckedChange={(checked) => toggleOne(asset.id, checked)}
                    disabled={!eligible || locked}
                  />
                  <div className="file-identity">
                    <span className="file-mark" aria-hidden="true">{asset.kind.slice(0, 1)}</span>
                    <strong>{asset.name}</strong>
                  </div>
                </div>
                <div className="meta-cell" data-label="Owner">{asset.owner}</div>
                <div className="meta-cell" data-label="Type & size">
                  <span>{asset.kind}</span><span className="dot" aria-hidden="true">·</span><span>{asset.size}</span>
                </div>
                <div className="status-cell" data-label="Status">
                  <Badge tone={statusTone[asset.status]}>{statusLabel[asset.status]}</Badge>
                  {asset.reason && <p className="blocked-reason">{asset.reason}</p>}
                </div>
              </article>
            );
          })}
        </section>

        <div className="decision-panel">
          <div className="decision-copy">
            <span className="decision-number">{selected.length}</span>
            <div><strong>Ready to decide</strong><p>Select one or more pending files to continue.</p></div>
          </div>
          <div className="decision-actions">
            <Button variant="secondary" onClick={() => setRejecting(true)} disabled={!selected.length || locked}>
              Reject selected
            </Button>
            <Button onClick={approve} loading={pending && !rejecting} disabled={!selected.length || locked}>
              Approve selected
            </Button>
          </div>
        </div>

        {rejecting && (
          <section className="rejection-panel" aria-labelledby="rejection-title">
            <div>
              <p className="section-kicker">Rejection details</p>
              <h2 id="rejection-title">Tell the team what needs attention</h2>
            </div>
            <Textarea
              ref={reasonRef}
              label="Rejection reason"
              value={reason}
              onChange={(event) => { setReason(event.target.value); setReasonError(''); }}
              error={reasonError || undefined}
              description="Be specific enough for the owner to make the next revision."
              disabled={locked}
              rows={3}
            />
            <Button onClick={confirmReject} loading={pending} disabled={!selected.length || locked}>
              Confirm rejection
            </Button>
          </section>
        )}

        {failure && failedPayload && (
          <div className="service-message error-message" role="alert">
            <div><strong>Decision not submitted</strong><p>{failure}</p></div>
            <Button variant="secondary" onClick={() => void runDecision(failedPayload)} disabled={pending}>
              Retry decision
            </Button>
          </div>
        )}
        <div className="status-message" role="status">{success}</div>
      </Card>
    </main>
  );
}

export default App;
