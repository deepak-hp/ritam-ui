import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root } from './paths.mjs';

const read = async path => readFile(resolve(root, path), 'utf8');
const json = async path => JSON.parse(await read(path));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const key = await json('private-key.json');
const confirmationVerifierSha256 = sha256(await read('scripts/browser-confirmation.mjs'));
const verifierSha256 = '17409de7c4c29beee1e610a28fdfde3ee036650b175f8e99abdedad0ca1c64aa';
if (sha256(await read('scripts/browser.mjs')) !== verifierSha256) {
  throw new Error('Primary verifier changed. Do not relabel existing observations with a new verifier hash.');
}
const records = [];
for (const run of key.runs) {
  const prefix = `runs/${run.id}`;
  const notes = await read(`${prefix}/NOTES.md`);
  const files = {};
  let lines = 0;
  for (const name of ['App.tsx', 'app.css', 'initial/App.tsx', 'initial/app.css', 'NOTES.md', 'prompt.txt']) {
    const content = await read(`${prefix}/${name}`);
    files[name] = sha256(content);
    if (name === 'App.tsx' || name === 'app.css') lines += content.trimEnd().split(/\r?\n/).length;
  }
  const check = await json(`evidence/${run.id}/check.json`);
  for (const name of ['App.tsx', 'app.css', 'prompt.txt']) {
    if (files[name] !== check.hashes[name]) throw new Error(`${run.id}: source changed after verification: ${name}`);
  }
  const browser = await json(`evidence/${run.id}/browser.json`);
  const confirmation = await json(`evidence-confirmation/${run.id}/browser.json`);
  if (confirmation.provenance.verifierSha256 !== confirmationVerifierSha256) {
    throw new Error(`${run.id}: supplemental result uses a different verifier. Preserve it and rerun the fixed verifier consistently.`);
  }
  for (const name of ['App.tsx', 'app.css', 'prompt.txt']) {
    if (files[name] !== confirmation.provenance.sourceHashes[name]) throw new Error(`${run.id}: source differs from supplemental evidence: ${name}`);
  }
  const invocations = (await readdir(resolve(root, `evidence/${run.id}/checks`))).filter(name => /^\d+$/.test(name));
  const checkHistory = [];
  for (const invocation of invocations.sort()) {
    const attempt = `evidence/${run.id}/checks/${invocation}`;
    checkHistory.push({
      invocation, result: await json(`${attempt}/check.json`),
      typecheckLog: await read(`${attempt}/typecheck.txt`),
      buildLog: await read(`${attempt}/build.txt`),
    });
  }
  const dates = [...notes.matchAll(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})/g)].map(match => match[0]);
  run.status = browser.status === 'blocked' ? 'generated-browser-blocked' : 'generated-and-measured';
  run.startedAt = dates[0] ?? null;
  run.finishedAt = dates.at(-1) ?? null;
  run.corrections = [`See runs/${run.id}/NOTES.md and preserved initial sources.`];
  const record = {
    ...run, sourceLines: lines, lineLimitExceeded: lines > 450,
    checkInvocations: invocations.length, observedInvocationLimitExceeded: invocations.length > 2,
    files, check, checkHistory, browser, confirmation,
    browserEvidenceWrittenAt: (await stat(resolve(root, `evidence/${run.id}/browser.json`))).mtime.toISOString(),
    verifierSha256,
    primaryProvenance: 'Reconstructed from the frozen verifier and controller execution record, not measurement-time attestation. Original browser.json did not embed a verifier hash.',
  };
  await writeFile(resolve(root, prefix, 'manifest.json'), JSON.stringify(record, null, 2) + '\n');
  records.push(record);
}
await mkdir(resolve(root, 'results'), { recursive: true });
await writeFile(resolve(root, 'results/primary-verifier.mjs'), await read('scripts/browser.mjs'));
await writeFile(resolve(root, 'results/confirmation-verifier.mjs'), await read('scripts/browser-confirmation.mjs'));
await writeFile(resolve(root, 'results/observations.json'), JSON.stringify({
  collectedAt: new Date().toISOString(),
  question: 'In-domain whole-library-plus-guidance pilot; not a causal or general superiority result.',
  humanReview: 'pending',
  limitations: [
    'All tasks overlap supplied canonical examples; two repeats per task/condition.',
    'Model alias, shared filesystem, unequal reading material and unenforced time/token budgets.',
    'Common harness lacked CSS import declarations; see AMENDMENTS.md.',
    'Browser checks are partial. Selector/timing failures require interpretation, not automatic attribution to product defects.',
    'Review hides condition labels only; order is fixed and visual identity can reveal a condition.',
  ], records,
}, null, 2) + '\n');
await writeFile(resolve(root, 'private-key.json'), JSON.stringify(key, null, 2) + '\n');
console.log(`Preserved objective observations and provenance for ${records.length} attempts. Human review remains pending.`);
