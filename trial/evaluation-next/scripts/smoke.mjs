// Independent mechanical harness fixture, excluded from all four candidate denominators.
import { mkdir, writeFile, cp, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { root, trial, runPath } from './paths.mjs';
const dir=runPath('c000000');await mkdir(dir,{recursive:true});
await cp(resolve(trial,'dist'),resolve(root,'materials/package'),{recursive:true});
await writeFile(resolve(dir,'prompt.txt'),'Harness smoke fixture, not an AI candidate.');
await writeFile(resolve(dir,'app.css'),`body{background:var(--eval-canvas);color:var(--eval-text)}main{max-width:850px;padding:20px;margin:auto}fieldset{min-width:0;margin:12px 0}label{display:block;overflow-wrap:anywhere}button,input,textarea{font:inherit}button{margin:6px;min-height:40px}textarea{display:block;max-width:100%;width:100%}:focus-visible{outline:3px solid var(--eval-text);outline-offset:3px}`);
await writeFile(resolve(dir,'App.tsx'),`import React,{useEffect,useRef,useState} from 'react';
import {getAssets,submitDecision,type Decision} from '../../shared/service';
import './app.css';
export default function App(){
 const [assets,setAssets]=useState(getAssets),[selected,setSelected]=useState<string[]>([]),[reject,setReject]=useState(false),[reason,setReason]=useState(''),[error,setError]=useState(''),[message,setMessage]=useState(''),[pending,setPending]=useState(false),[failed,setFailed]=useState<Decision|null>(null);
 const reasonRef=useRef<HTMLTextAreaElement>(null),allRef=useRef<HTMLInputElement>(null);
 const eligible=assets.filter(a=>a.status==='pending');
 useEffect(()=>{if(allRef.current)allRef.current.indeterminate=selected.length>0&&selected.length<eligible.length},[selected,eligible.length]);
 async function send(payload:Decision){setPending(true);setError('');try{setAssets(await submitDecision(payload));setSelected([]);setReject(false);setReason('');setFailed(null);setMessage('Review saved');}catch(e){setError((e as Error).message);setFailed(payload)}finally{setPending(false)}}
 return <main><h1>File review</h1><p>Demo data and simulated review service.</p><label><input ref={allRef} type="checkbox" aria-label="Select all pending files" checked={eligible.length>0&&selected.length===eligible.length} disabled={pending||!eligible.length} onChange={e=>setSelected(e.target.checked?eligible.map(a=>a.id):[])}/>Select all pending files</label>
 {assets.map(a=><fieldset key={a.id}><legend>{a.name}</legend><label><input type="checkbox" aria-label={'Select '+a.name} checked={selected.includes(a.id)} disabled={pending||a.status!=='pending'} onChange={e=>setSelected(e.target.checked?[...selected,a.id]:selected.filter(id=>id!==a.id))}/>Select {a.name}</label><p>{a.owner} · {a.kind} · {a.size} · {a.status}</p>{a.reason&&<p>{a.reason}</p>}</fieldset>)}
 <p>{selected.length} selected</p><button disabled={!selected.length||pending} onClick={()=>send({ids:selected,decision:'approved',reason:''})}>Approve selected</button><button disabled={!selected.length||pending} onClick={()=>setReject(true)}>Reject selected</button>
 {reject&&<div><label>Rejection reason<textarea ref={reasonRef} value={reason} disabled={pending} onChange={e=>setReason(e.target.value)}/></label><button disabled={pending} onClick={()=>{if(!reason.trim()){setError('Enter a rejection reason.');reasonRef.current?.focus();return}void send({ids:selected,decision:'rejected',reason})}}>Confirm rejection</button></div>}
 {error&&<div role="alert">{error}</div>}{failed&&<button disabled={pending} onClick={()=>send(failed)}>Retry decision</button>}<p role="status">{message}</p></main>
}`);
for(const args of [['--test',resolve(root,'scripts/service.test.mjs')],[resolve(root,'scripts/check.mjs'),'c000000','initial'],[resolve(root,'scripts/check.mjs'),'c000000','final'],[resolve(root,'scripts/browser.mjs'),'c000000']]){
 const result=spawnSync(process.execPath,args,{cwd:trial,encoding:'utf8'});console.log(result.stdout);if(result.stderr)console.error(result.stderr);assert.equal(result.status,0,'Smoke subprocess failed');
}
const report=JSON.parse(await readFile(resolve(root,'evidence/c000000/browser/browser.json'),'utf8'));assert.equal(report.results.length,7);assert.ok(report.results.every(row=>row.status==='pass'),JSON.stringify(report.results));
await writeFile(resolve(root,'evidence/preflight.json'),JSON.stringify({checkedAt:new Date().toISOString(),fixture:'c000000 (not a candidate)',serviceContracts:'pass',compiler:'pass',browserScenarios:report.results,notes:'Native HTML positive-control fixture validates harness mechanics only; candidate library controls are not pretested by this fixture.'},null,2));
console.log('Pre-generation service, compiler and seven browser mechanics checks passed.');
