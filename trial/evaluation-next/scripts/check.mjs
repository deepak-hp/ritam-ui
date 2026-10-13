import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { root, trial, runPath, sha } from './paths.mjs';
const id = process.argv[2], stage = process.argv[3];
if (!['initial','final'].includes(stage)) throw new Error('Usage: check.mjs ID initial|final');
if (!process.version.startsWith('v24.')) throw new Error('Use explicit Node 24 executable');
const dir = runPath(id), runtime = resolve(root,'.runtime',id), out = resolve(root,'evidence',id,stage);
await mkdir(out,{recursive:true});
try { await access(resolve(out,'check.json')); throw new Error('Attempt already archived; no overwrite'); } catch(e) { if(e.code!=='ENOENT')throw e; }
await mkdir(runtime,{recursive:true});
const slash = value => value.replaceAll('\\','/');
const pkg = resolve(root,'materials/package');
await writeFile(resolve(runtime,'main.tsx'), `import React from 'react';\nimport {createRoot} from 'react-dom/client';\nimport App from ${JSON.stringify(slash(resolve(dir,'App.tsx')))};\nimport ${JSON.stringify(slash(resolve(root,'shared/brand.css')))};\nimport {journal} from ${JSON.stringify(slash(resolve(root,'shared/service.ts')))};\nObject.defineProperty(window,'__reviewJournal',{get:()=>journal});\ndocument.documentElement.dataset.dpTheme=new URLSearchParams(location.search).get('theme')==='dark'?'dark':'light';\ndocument.body.className='dp-theme';\ncreateRoot(document.getElementById('root')!).render(<App/>);`);
await writeFile(resolve(runtime,'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>File review candidate</title></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>');
await writeFile(resolve(runtime,'css.d.ts'), "declare module '*.css';\n");
await writeFile(resolve(runtime,'tsconfig.json'), JSON.stringify({compilerOptions:{target:'ES2022',lib:['ES2022','DOM','DOM.Iterable'],module:'ESNext',moduleResolution:'Bundler',jsx:'react-jsx',strict:true,skipLibCheck:true,esModuleInterop:true,noEmit:true,types:['react','react-dom'],paths:{'@serein-ui/react':[slash(resolve(pkg,'index.d.ts'))]}},files:[slash(resolve(dir,'App.tsx')),slash(resolve(runtime,'css.d.ts'))]},null,2));
const hashes = {}, source = {};
for(const file of ['App.tsx','app.css','prompt.txt']) {
  try { const bytes=await readFile(resolve(dir,file)); hashes[file]=sha(bytes); source[file]=bytes.toString('utf8'); await cp(resolve(dir,file),resolve(out,file)); }
  catch(e) { if(e.code!=='ENOENT')throw e; hashes[file]=null; }
}
const lineCount = ['App.tsx','app.css'].reduce((n,file)=>n+(source[file]?.split('\n').length??0),0);
const check = spawnSync(process.execPath,[resolve(trial,'node_modules/typescript/bin/tsc'),'-p',resolve(runtime,'tsconfig.json')],{cwd:trial,encoding:'utf8'});
await writeFile(resolve(out,'typecheck.txt'),(check.stdout??'')+(check.stderr??'')+(check.error?.message??''));
let buildError=null;
try { await build({configFile:false,root:runtime,base:'./',plugins:[react()],resolve:{alias:[{find:'@serein-ui/react/styles.css',replacement:resolve(pkg,'styles.css')},{find:'@serein-ui/react',replacement:resolve(pkg,'index.js')}]},build:{outDir:resolve(root,'builds',id),emptyOutDir:true},logLevel:'silent'}); }
catch(e) {buildError=e.stack??String(e);}
await writeFile(resolve(out,'build.txt'),buildError??'Vite build succeeded.');
const tools={node:process.version};
for(const name of ['typescript','vite','react','react-dom','playwright','axe-core']) tools[name]=JSON.parse(await readFile(resolve(trial,'node_modules',name,'package.json'),'utf8')).version;
const fingerprint=await readFile(resolve(root,'materials/fingerprint.json')).catch(e=>{if(id==='c000000'&&e.code==='ENOENT')return null;throw e;});
const result={id,stage,checkedAt:new Date().toISOString(),typecheck:check.status??1,build:buildError?1:0,lineCount,lineBudgetPass:lineCount<=450,hashes,tools,compilerHarnessSha256:sha(await readFile(new URL(import.meta.url))),frozenFingerprintSha256:fingerprint?sha(fingerprint):'pre-freeze-smoke-only'};
await writeFile(resolve(out,'check.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result)); process.exitCode=result.typecheck||result.build||!result.lineBudgetPass?1:0;
