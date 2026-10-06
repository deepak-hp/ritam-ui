import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { root, trial, runPath } from './paths.mjs';
const id = process.argv[2];
const dir = runPath(id);
const runtime = resolve(root, '.runtime', id);
const evidence = resolve(root, 'evidence', id);
await mkdir(runtime, { recursive:true }); await mkdir(evidence, { recursive:true });
const checks = resolve(evidence,'checks'); await mkdir(checks,{recursive:true});
const sequence = String((await readdir(checks)).filter(x=>/^\d+$/.test(x)).length+1).padStart(3,'0');
const history = resolve(checks,sequence); await mkdir(history);
const slash = p => p.replaceAll('\\','/');
const artifact = resolve(root, 'materials/package');
await writeFile(resolve(runtime,'main.tsx'), `import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from ${JSON.stringify(slash(resolve(dir,'App.tsx')))};\nimport ${JSON.stringify(slash(resolve(root,'shared/brand.css')))};\nimport {journal} from ${JSON.stringify(slash(resolve(root,'shared/service.ts')))};\nObject.defineProperty(window,'__evaluationJournal',{get:()=>journal});\ndocument.documentElement.dataset.dpTheme=new URLSearchParams(location.search).get('theme')==='dark'?'dark':'light';\ndocument.body.className='dp-theme';\ncreateRoot(document.getElementById('root')!).render(<App/>);`);
await writeFile(resolve(runtime,'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Candidate</title></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>');
await writeFile(resolve(runtime,'tsconfig.json'), JSON.stringify({compilerOptions:{target:'ES2022',lib:['ES2022','DOM','DOM.Iterable'],module:'ESNext',moduleResolution:'Bundler',jsx:'react-jsx',strict:true,skipLibCheck:true,esModuleInterop:true,allowImportingTsExtensions:true,noEmit:true,types:['react','react-dom'],paths:{'@ritam-ui/react':[slash(resolve(artifact,'index.d.ts'))],'@ritam-ui/react/styles.css':[slash(resolve(artifact,'styles.d.ts'))]}},files:[slash(resolve(dir,'App.tsx'))]},null,2));
const checked = spawnSync(process.execPath,[resolve(trial,'node_modules/typescript/bin/tsc'),'-p',resolve(runtime,'tsconfig.json')],{encoding:'utf8',cwd:trial});
const typecheckLog=(checked.stdout??'')+(checked.stderr??'')+(checked.error?.message??'');
await writeFile(resolve(evidence,'typecheck.txt'),typecheckLog);
await writeFile(resolve(history,'typecheck.txt'),typecheckLog);
let buildError = null;
try {
  await build({configFile:false,root:runtime,base:'./',plugins:[react()],resolve:{alias:[{find:'@ritam-ui/react/styles.css',replacement:resolve(artifact,'styles.css')},{find:'@ritam-ui/react',replacement:resolve(artifact,'index.js')}]},build:{outDir:resolve(root,'builds',id),emptyOutDir:true},logLevel:'silent'});
} catch(e) { buildError = e.stack || String(e); }
await writeFile(resolve(evidence,'build.txt'),buildError??'Vite build succeeded.');
await writeFile(resolve(history,'build.txt'),buildError??'Vite build succeeded.');
const hashes = {};
for (const file of ['App.tsx','app.css','prompt.txt']) { try { hashes[file]=createHash('sha256').update(await readFile(resolve(dir,file))).digest('hex'); } catch { hashes[file]=null; } }
const tools={node:process.version};
for(const name of ['typescript','vite','react','react-dom','playwright','source-map-js'])tools[name]=JSON.parse(await readFile(resolve(trial,'node_modules',name,'package.json'),'utf8')).version;
const packageFingerprintSha256=createHash('sha256').update(await readFile(resolve(root,'materials/fingerprint.json'))).digest('hex');
const result={id,sequence,checkedAt:new Date().toISOString(),typecheck:checked.status??1,build:buildError?1:0,hashes,tools,packageFingerprintSha256};
await writeFile(resolve(evidence,'check.json'),JSON.stringify(result,null,2));
await writeFile(resolve(history,'check.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result)); process.exitCode=result.typecheck||result.build?1:0;
