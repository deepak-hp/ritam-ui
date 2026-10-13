import { useEffect, useRef, useState } from 'react';
import { getAssets, submitDecision } from '../../shared/service';
import type { Asset, Decision, ReviewStatus } from '../../shared/service';
import './app.css';

const statusCopy: Record<ReviewStatus, string> = {
  pending: 'Pending review',
  approved: 'Approved',
  rejected: 'Rejected',
  blocked: 'Blocked',
};

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(() => getAssets());
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [failure, setFailure] = useState('');
  const [success, setSuccess] = useState('');
  const [failedPayload, setFailedPayload] = useState<Decision | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const pendingIds = assets.filter((asset) => asset.status === 'pending').map((asset) => asset.id);
  const selectedCount = selected.size;
  const allPendingSelected = pendingIds.length > 0 && pendingIds.every((id) => selected.has(id));

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedCount > 0 && !allPendingSelected;
    }
  }, [selectedCount, allPendingSelected]);

  function toggleAsset(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setFailure('');
    setFailedPayload(null);
  }

  function toggleAll() {
    setSelected(allPendingSelected ? new Set() : new Set(pendingIds));
    setFailure('');
    setFailedPayload(null);
  }

  async function sendDecision(payload: Decision) {
    if (submitting) return;
    setSubmitting(true);
    setFailure('');
    setSuccess('');
    try {
      const updated = await submitDecision(payload);
      setAssets(updated);
      setSelected(new Set());
      setRejecting(false);
      setReason('');
      setReasonError('');
      setFailedPayload(null);
      const action = payload.decision === 'approved' ? 'approved' : 'rejected';
      setSuccess(`${payload.ids.length} ${payload.ids.length === 1 ? 'file' : 'files'} ${action}.`);
    } catch (error) {
      setFailedPayload(payload);
      setFailure(error instanceof Error ? error.message : 'The decision could not be saved.');
    } finally {
      setSubmitting(false);
    }
  }

  function approveSelected() {
    if (!selectedCount || submitting) return;
    setRejecting(false);
    void sendDecision({ ids: [...selected], decision: 'approved', reason: '' });
  }

  function openRejection() {
    if (!selectedCount || submitting) return;
    setRejecting(true);
    setReasonError('');
    setFailure('');
    setFailedPayload(null);
  }

  function confirmRejection() {
    if (!reason.trim()) {
      setReasonError('Enter a reason before rejecting these files.');
      reasonRef.current?.focus();
      return;
    }
    setReasonError('');
    void sendDecision({ ids: [...selected], decision: 'rejected', reason });
  }

  return (
    <main className="workspace">
      <header className="masthead">
        <div>
          <p className="eyebrow">Creative operations</p>
          <h1>File review</h1>
          <p className="intro">Review the team’s latest files and record one clear decision.</p>
        </div>
        <span className="demo-badge">Demo data</span>
      </header>

      <section className="review-panel" aria-labelledby="queue-heading">
        <div className="panel-heading">
          <div>
            <p className="kicker">Review queue</p>
            <h2 id="queue-heading">Creative files</h2>
          </div>
          <p className="queue-count"><strong>{pendingIds.length}</strong> pending</p>
        </div>

        <div className="selection-bar">
          <label className="check-label select-all">
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={allPendingSelected}
              onChange={toggleAll}
              disabled={pendingIds.length === 0 || submitting}
            />
            <span>Select all pending files</span>
          </label>
          <span className="selection-count" aria-live="polite">{selectedCount} selected</span>
        </div>

        <div className="table-region" role="region" aria-label="Files for review" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Select</span></th>
                <th scope="col">File</th>
                <th scope="col">Owner</th>
                <th scope="col">Type</th>
                <th scope="col">Size</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const eligible = asset.status === 'pending';
                return (
                  <tr key={asset.id} className={selected.has(asset.id) ? 'is-selected' : ''}>
                    <td className="select-cell" data-label="Select">
                      <input
                        type="checkbox"
                        aria-label={`Select ${asset.name}`}
                        checked={selected.has(asset.id)}
                        onChange={() => toggleAsset(asset.id)}
                        disabled={!eligible || submitting}
                      />
                    </td>
                    <th scope="row" data-label="File">
                      <span className="file-name">{asset.name}</span>
                      {asset.reason && <span className="file-reason">{asset.reason}</span>}
                    </th>
                    <td data-label="Owner">{asset.owner}</td>
                    <td data-label="Type">{asset.kind}</td>
                    <td data-label="Size">{asset.size}</td>
                    <td data-label="Status"><span className={`status status-${asset.status}`}>{statusCopy[asset.status]}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="decision-area">
          <div className="decision-copy">
            <p className="kicker">Batch decision</p>
            <p>{selectedCount ? `${selectedCount} ${selectedCount === 1 ? 'file is' : 'files are'} ready for review.` : 'Select pending files to continue.'}</p>
          </div>
          <div className="action-row">
            <button className="button secondary" type="button" onClick={openRejection} disabled={!selectedCount || submitting}>Reject selected</button>
            <button className="button primary" type="button" onClick={approveSelected} disabled={!selectedCount || submitting}>{submitting && !rejecting ? 'Approving…' : 'Approve selected'}</button>
          </div>
        </div>

        {rejecting && (
          <div className="reject-panel">
            <div>
              <h3>Reject {selectedCount === 1 ? 'file' : `${selectedCount} files`}</h3>
              <p>Share a specific reason so the team knows what to revise.</p>
            </div>
            <label htmlFor="rejection-reason">Rejection reason</label>
            <textarea
              ref={reasonRef}
              id="rejection-reason"
              value={reason}
              onChange={(event) => { setReason(event.target.value); setReasonError(''); }}
              rows={3}
              aria-invalid={Boolean(reasonError)}
              aria-describedby={reasonError ? 'reason-error' : undefined}
            />
            {reasonError && <p id="reason-error" className="field-error">{reasonError}</p>}
            <div className="action-row">
              <button className="button quiet" type="button" onClick={() => setRejecting(false)} disabled={submitting}>Cancel</button>
              <button className="button danger" type="button" onClick={confirmRejection} disabled={submitting}>{submitting ? 'Rejecting…' : 'Confirm rejection'}</button>
            </div>
          </div>
        )}

        {failure && (
          <div className="notice error-notice" role="alert">
            <div><strong>Decision not saved</strong><p>{failure}</p></div>
            <button className="button retry" type="button" onClick={() => failedPayload && void sendDecision(failedPayload)} disabled={submitting || !failedPayload}>Retry decision</button>
          </div>
        )}
        <div className="status-message" role="status">{success}</div>
      </section>
    </main>
  );
}
