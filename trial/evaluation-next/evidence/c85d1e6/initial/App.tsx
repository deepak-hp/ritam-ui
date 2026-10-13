import { useEffect, useRef, useState } from 'react';
import { getAssets, submitDecision, type Asset, type Decision } from '../../shared/service';
import './app.css';

const statusLabel: Record<Asset['status'], string> = {
  pending: 'Pending review',
  approved: 'Approved',
  rejected: 'Rejected',
  blocked: 'Blocked',
};

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(() => getAssets());
  const [selected, setSelected] = useState<string[]>([]);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [failedPayload, setFailedPayload] = useState<Decision | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const pendingAssets = assets.filter((asset) => asset.status === 'pending');
  const allSelected = pendingAssets.length > 0 && pendingAssets.every((asset) => selected.includes(asset.id));
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  function toggleAsset(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setNotice('');
  }

  function toggleAll() {
    setSelected(allSelected ? [] : pendingAssets.map((asset) => asset.id));
    setNotice('');
  }

  async function runDecision(payload: Decision) {
    if (pending) return;
    setPending(true);
    setError('');
    setNotice('');
    try {
      const updated = await submitDecision(payload);
      setAssets(updated);
      setSelected([]);
      setRejecting(false);
      setReason('');
      setFailedPayload(null);
      setNotice(`${payload.ids.length} ${payload.ids.length === 1 ? 'file' : 'files'} ${payload.decision}.`);
    } catch (caught) {
      setFailedPayload(payload);
      setError(caught instanceof Error ? caught.message : 'The decision could not be submitted.');
    } finally {
      setPending(false);
    }
  }

  function approve() {
    if (!selected.length || pending) return;
    void runDecision({ ids: [...selected], decision: 'approved', reason: '' });
  }

  function openRejection() {
    if (!selected.length || pending) return;
    setRejecting(true);
    setError('');
    requestAnimationFrame(() => reasonRef.current?.focus());
  }

  function confirmRejection() {
    if (!reason.trim()) {
      setError('Enter a reason before rejecting the selected files.');
      reasonRef.current?.focus();
      return;
    }
    void runDecision({ ids: [...selected], decision: 'rejected', reason: reason.trim() });
  }

  const reviewedCount = assets.filter((asset) => asset.status === 'approved' || asset.status === 'rejected').length;

  return (
    <main className="workspace">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true"><span>F</span></div>
        <div>
          <p className="eyebrow">Studio review · Demo data</p>
          <h1>File review</h1>
          <p className="intro">Check the latest creative files and make a clear team decision.</p>
        </div>
        <div className="progress" aria-label={`${reviewedCount} of ${assets.length} files reviewed`}>
          <strong>{reviewedCount}/{assets.length}</strong>
          <span>reviewed</span>
        </div>
      </header>

      <section className="review-card" aria-labelledby="queue-title">
        <div className="queue-header">
          <div>
            <p className="section-kicker">Review queue</p>
            <h2 id="queue-title">Creative files</h2>
          </div>
          <div className="selection-count" aria-live="polite">
            <strong>{selected.length}</strong>
            <span>{selected.length === 1 ? 'file selected' : 'files selected'}</span>
          </div>
        </div>

        <div className="bulk-bar">
          <label className="check-label">
            <input
              ref={selectAllRef}
              type="checkbox"
              aria-label="Select all pending files"
              checked={allSelected}
              onChange={toggleAll}
              disabled={!pendingAssets.length || pending}
            />
            <span>Select all pending</span>
          </label>
          <span className="pending-note">{pendingAssets.length} awaiting review</span>
        </div>

        <div className="table-region" role="region" aria-label="Files for review" tabIndex={0}>
          <table>
            <thead>
              <tr><th className="select-cell"><span className="sr-only">Select</span></th><th>File</th><th>Owner</th><th>Details</th><th>Status</th></tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const eligible = asset.status === 'pending';
                return (
                  <tr key={asset.id} className={!eligible ? 'ineligible' : ''}>
                    <td className="select-cell">
                      <input
                        type="checkbox"
                        aria-label={`Select ${asset.name}`}
                        checked={selected.includes(asset.id)}
                        onChange={() => toggleAsset(asset.id)}
                        disabled={!eligible || pending}
                      />
                    </td>
                    <td data-label="File">
                      <div className="file-identity">
                        <span className={`file-icon ${asset.kind.toLowerCase()}`} aria-hidden="true">{asset.kind.slice(0, 1)}</span>
                        <strong>{asset.name}</strong>
                      </div>
                    </td>
                    <td data-label="Owner">{asset.owner}</td>
                    <td data-label="Details"><span>{asset.kind}</span><span className="detail-dot">·</span><span>{asset.size}</span></td>
                    <td data-label="Status">
                      <span className={`status ${asset.status}`}><i aria-hidden="true" />{statusLabel[asset.status]}</span>
                      {asset.reason && <span className="blocked-reason">{asset.reason}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rejecting && (
          <div className="rejection-panel">
            <div>
              <label htmlFor="rejection-reason">Rejection reason</label>
              <p>Share concise feedback so the team knows what to revise.</p>
            </div>
            <textarea
              ref={reasonRef}
              id="rejection-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={3}
              disabled={pending}
              aria-describedby="reason-help"
            />
            <span id="reason-help" className="sr-only">A reason is required to reject files.</span>
            <button className="danger" onClick={confirmRejection} disabled={pending}>Confirm rejection</button>
          </div>
        )}

        {error && (
          <div className="message error-message" role="alert">
            <span><strong>Decision not submitted.</strong> {error}</span>
            {failedPayload && <button className="retry" onClick={() => void runDecision(failedPayload)} disabled={pending}>Retry decision</button>}
          </div>
        )}
        {notice && <div className="message success-message" role="status"><strong>Review updated.</strong> {notice}</div>}

        <footer className="action-bar">
          <p>{selected.length ? `${selected.length} ready for a decision` : 'Select pending files to begin'}</p>
          <div className="actions">
            <button className="secondary" onClick={openRejection} disabled={!selected.length || pending}>Reject selected</button>
            <button className="primary" onClick={approve} disabled={!selected.length || pending}>Approve selected</button>
          </div>
        </footer>
      </section>
    </main>
  );
}
