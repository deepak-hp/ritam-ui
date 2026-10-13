// Recreate ignored review assets from verified final source; never rewrite archived measurements.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { root, trial, ids, runPath, sha } from './paths.mjs';
if(!process.version.startsWith('v24.'))throw new Error('Use Node 24 for replay');
const fingerprintBytes=await readFile(resolve(root,'materials/fingerprint.json'));
const fingerprint=JSON.parse(fingerprintBytes);
for(const [path,hash] of Object.entries(fingerprint.hashes))assert.equal(sha(await readFile(resolve(root,path))),hash,`Frozen input changed: ${path}`);
const finals={};
for(const id of ids){
 const bytes=await readFile(resolve(root,'evidence',id,'final/check.json')),record=JSON.parse(bytes);
 assert.equal(record.frozenFingerprintSha256,sha(fingerprintBytes),`Fingerprint mismatch: ${id}`);
 for(const [file,hash] of Object.entries(record.hashes))assert.equal(sha(await readFile(resolve(runPath(id),file))),hash,`Final source changed: ${id}/${file}`);
 finals[id]={record,checkReportSha256:sha(bytes)};
}
const slash=p=>p.replaceAll('\\','/'),pkg=resolve(root,'materials/package');
const replay={replayedAt:new Date().toISOString(),meaning:'Build replay only; historical compiler/browser outcomes have not been rerun.',node:process.version,frozenFingerprintSha256:sha(fingerprintBytes),frozenFilesVerified:Object.keys(fingerprint.hashes).length,candidates:[]};
for(const id of ids){
 const {record,checkReportSha256}=finals[id];
 if(record.typecheck||record.build){replay.candidates.push({id,status:'unavailable',checkReportSha256});continue;}
 const runtime=resolve(root,'.runtime/replay',id);await mkdir(runtime,{recursive:true});
 await writeFile(resolve(runtime,'main.tsx'),`import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from ${JSON.stringify(slash(resolve(runPath(id),'App.tsx')))};\nimport ${JSON.stringify(slash(resolve(root,'shared/brand.css')))};\nimport {journal} from ${JSON.stringify(slash(resolve(root,'shared/service.ts')))};\nObject.defineProperty(window,'__reviewJournal',{get:()=>journal});\ndocument.documentElement.dataset.dpTheme=new URLSearchParams(location.search).get('theme')==='dark'?'dark':'light';\ndocument.body.className='dp-theme';\ncreateRoot(document.getElementById('root')!).render(<App/>);`);
 await writeFile(resolve(runtime,'index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>File review candidate</title></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>');
 await build({configFile:false,root:runtime,base:'./',plugins:[react()],resolve:{alias:[{find:'@serein-ui/react/styles.css',replacement:resolve(pkg,'styles.css')},{find:'@serein-ui/react',replacement:resolve(pkg,'index.js')}]},build:{outDir:resolve(root,'builds',id),emptyOutDir:true},logLevel:'silent'});
 replay.candidates.push({id,status:'rebuilt',sourceHashes:record.hashes,checkReportSha256});
}
const links=replay.candidates.map(row=>`<section><h2>${row.id}</h2><p>${row.status==='rebuilt'?`<a href="/${row.id}/?theme=light">Light</a> · <a href="/${row.id}/?theme=dark">Dark</a>`:'Unavailable — retained in denominator'}</p></section>`).join('');
await mkdir(resolve(root,'builds'),{recursive:true});
await writeFile(resolve(root,'builds/index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>File review comparison</title><style>body{font:17px system-ui;max-width:760px;margin:40px auto;padding:20px;line-height:1.5}section{border-top:1px solid #aaa;margin-top:24px}a{color:#164d99}</style><h1>File review comparison</h1><p>Four candidates, one task. Labels hide condition names; visual appearance may reveal a condition. Order is fixed by opaque ID. Review each independently before viewing the condition mapping.</p><p>These local assets were rebuilt from verified archived final source. Historical compiler and browser observations were not rerun. Reload resets the simulated first-call failure.</p>${links}</html>`);
await writeFile(resolve(root,'builds/replay.json'),JSON.stringify(replay,null,2));
console.log(JSON.stringify(replay));
