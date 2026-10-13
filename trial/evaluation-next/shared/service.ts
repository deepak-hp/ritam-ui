export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'blocked';
export type Asset = { id: string; name: string; owner: string; kind: string; size: string; status: ReviewStatus; reason?: string };
export type Decision = { ids: string[]; decision: 'approved' | 'rejected'; reason: string };
const seed: Asset[] = [
  { id: 'a1', name: 'Homepage hero.png', owner: 'Maya Chen', kind: 'Image', size: '2.4 MB', status: 'pending' },
  { id: 'a2', name: 'Product walkthrough.mp4', owner: 'Leo Patel', kind: 'Video', size: '18.6 MB', status: 'pending' },
  { id: 'a3', name: 'Accessibility review notes.pdf', owner: 'Amara Okafor', kind: 'Document', size: '840 KB', status: 'pending' },
  { id: 'a4', name: 'Campaign copy.docx', owner: 'Maya Chen', kind: 'Document', size: '120 KB', status: 'approved' },
  { id: 'a5', name: 'Unlicensed soundtrack.wav', owner: 'Leo Patel', kind: 'Audio', size: '9.1 MB', status: 'blocked', reason: 'Rights documentation missing' },
];
let records = structuredClone(seed);
let validCalls = 0;
export const journal: { payload: Decision; outcome: 'invalid' | 'failure' | 'success' }[] = [];
export function getAssets(): Asset[] { return structuredClone(records); }
export async function submitDecision(payload: Decision): Promise<Asset[]> {
  const snapshot = structuredClone(payload);
  const ids = new Set(payload.ids);
  if (!ids.size || ids.size !== payload.ids.length || !['approved', 'rejected'].includes(payload.decision) || (payload.decision === 'rejected' && !payload.reason.trim()) || [...ids].some(id => !records.some(asset => asset.id === id && asset.status === 'pending'))) {
    journal.push({ payload: snapshot, outcome: 'invalid' });
    throw new Error('Choose pending files and provide a rejection reason.');
  }
  validCalls += 1;
  const call = validCalls;
  await new Promise(resolve => setTimeout(resolve, 350));
  if (call === 1) {
    journal.push({ payload: snapshot, outcome: 'failure' });
    throw new Error('Review service unavailable. Your selection and reason are retained.');
  }
  records = records.map(asset => ids.has(asset.id) ? { ...asset, status: payload.decision, reason: payload.decision === 'rejected' ? payload.reason.trim() : undefined } : asset);
  journal.push({ payload: snapshot, outcome: 'success' });
  return getAssets();
}
