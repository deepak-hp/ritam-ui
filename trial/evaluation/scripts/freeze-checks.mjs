import {readFile,writeFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {root,trial} from './paths.mjs';
const dest=resolve(root,'materials/checks-fingerprint.json');
try{await access(dest);throw new Error('Checks already frozen');}catch(e){if(e.code!=='ENOENT')throw e;}
const hashes={};for(const name of ['browser.mjs','check.mjs','server.mjs','review.mjs'])hashes[name]=createHash('sha256').update(await readFile(resolve(root,'scripts',name))).digest('hex');
const installed={node:process.version};for(const name of ['typescript','vite','react','react-dom','playwright','source-map-js'])installed[name]=JSON.parse(await readFile(resolve(trial,'node_modules',name,'package.json'),'utf8')).version;
await writeFile(dest,JSON.stringify({frozenAt:new Date().toISOString(),hashes,installed,note:'Frozen before inspecting any generated candidate source or tailoring checks to candidates. Package production artifacts were frozen independently. Root patched source-map-js lock entry from 1.2.1 to 1.2.2 after package snapshot; installed development dependencies remain unchanged during generation. No node_modules are included in evaluation artifacts.'},null,2));
console.log('Checks and installed tool versions frozen.');
