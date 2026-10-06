// One-time creation of the frozen experiment. Refuses to overwrite materials or prompts.
import { readFile, writeFile, mkdir, cp, readdir, access } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { root, trial } from './paths.mjs';
try { await access(resolve(root,'materials/fingerprint.json')); throw new Error('Materials already frozen'); } catch(e) { if (e.code !== 'ENOENT') throw e; }
const design = await readFile(resolve(trial,'../.superpowers/sdd/2026-10-07-public-beta/evaluation-design.md'),'utf8');
const section = heading => { const content=design.split(`### ${heading}\n`)[1]?.split('\n### ')[0]?.split('\n## ')[0]; if(!content)throw new Error(heading); return content.split('\n').filter(l=>l.startsWith('>')).map(l=>l.replace(/^> ?/,'')).join('\n'); };
await mkdir(resolve(root,'materials/guidance'),{recursive:true});
await cp(resolve(trial,'dist'),resolve(root,'materials/package'),{recursive:true});
for(const file of ['README.md','COMPOSITION.md','contract.json']) await cp(resolve(trial,'ai',file),resolve(root,'materials/guidance',file));
await cp(resolve(trial,'docs/API-CONTRACTS.md'),resolve(root,'materials/guidance/API-CONTRACTS.md'));
await cp(resolve(trial,'ai/examples'),resolve(root,'materials/guidance/examples'),{recursive:true});
const hashes={};
async function hashDir(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=resolve(dir,entry.name);if(entry.isDirectory())await hashDir(file);else hashes[relative(root,file).replaceAll('\\','/')]=createHash('sha256').update(await readFile(file)).digest('hex');}}
await hashDir(resolve(root,'materials')); await hashDir(resolve(root,'shared'));
await writeFile(resolve(root,'materials/fingerprint.json'),JSON.stringify({frozenAt:new Date().toISOString(),hashes},null,2));
const ids=['c7b92e1','c31f0a8','c8d145f','c62ae30','c19f4b2','ca570d1','ce293a4','c40bd79','c9a6e15','cf185c0','c24a8de','cb6d703'];
const mapping=[];let index=0;
for(const task of ['invoices','settings','onboarding']) for(const repeat of [1,2]) for(const condition of repeat===1?['plain','ritam']:['ritam','plain']) {
  const id=ids[index++], dir=resolve(root,'runs',id); await mkdir(dir,{recursive:true});
  const taskHeading={invoices:'Invoice task brief',settings:'Settings task brief',onboarding:'Onboarding task brief'}[task];
  const common=section('Common text (identical in both conditions)').replaceAll('RUN_DIR',dir.replaceAll('\\','/')).replace('TASK_BRIEF',section(taskHeading));
  const conditionText=section(condition==='plain'?'Plain condition paragraph':'Ritam condition paragraph');
  const prompt=common+'\n\n'+conditionText+'\n\n'+`Paths: shared files are ${resolve(root,'shared').replaceAll('\\','/')}. Import them from ../../shared/fixtures and ../../shared/service. Ritam condition materials (only if your condition permits them): ${resolve(root,'materials/guidance').replaceAll('\\','/')}. Matching example: ${task==='invoices'?'Invoices':task==='settings'?'Settings':'Onboarding'}.tsx.\nShared service: every operation waits 400ms, fails on its first call per page, succeeds on subsequent calls; journal export is harness-only, do not use it in your app. Exports/types/defaults are in shared/fixtures.ts.\nRun typecheck and build together using: node "${resolve(root,'scripts/check.mjs').replaceAll('\\','/')}" ${id}\nThe command writes logs outside your run directory. You may read only your own evaluation/evidence/${id}/typecheck.txt and build.txt for the one self-correction pass. Save your initial source before corrections even if it already passes. Do not read check/browser scripts or edit manifest.json. Do not use browser tools.\n`;
  await writeFile(resolve(dir,'prompt.txt'),prompt);
  const manifest={id,task,repeat,condition,model:'gpt-5.6-sol',reasoningEffort:'medium',status:'not-started',promptSha256:createHash('sha256').update(prompt).digest('hex'),startedAt:null,finishedAt:null,corrections:[]};
  await writeFile(resolve(dir,'manifest.json'),JSON.stringify(manifest,null,2));mapping.push(manifest);
}
await writeFile(resolve(root,'private-key.json'),JSON.stringify({warning:'Not part of label-blinded reviewer assets',runs:mapping},null,2));
console.log('Frozen package/guidance and 12 prompts prepared.');
