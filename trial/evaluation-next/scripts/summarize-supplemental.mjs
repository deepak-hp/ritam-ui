import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {root,ids,sha,runPath} from './paths.mjs';
const read=async p=>JSON.parse(await readFile(resolve(root,p),'utf8'));
const protocol=await read('evidence-supplemental/protocol.json'),candidates=[];
const count=(rows,render)=>rows.filter(r=>r.name.startsWith('render-')===render&&r.status==='pass').length;
for(const id of ids){
 const initial=await read(`evidence/${id}/initial/check.json`),final=await read(`evidence/${id}/final/check.json`),primary=await read(`evidence/${id}/browser/browser.json`),supplemental=await read(`evidence-supplemental/${id}/browser/browser.json`);
 assert.equal(sha(await readFile(resolve(root,`evidence/${id}/browser/browser.json`))),protocol.primaryBrowserHashes[id],'Primary report changed');
 assert.equal(supplemental.provenance.verifierSha256,protocol.verifierSha256);assert.equal(supplemental.provenance.pendingControlHelperSha256,protocol.helperSha256);
 for(const [file,hash] of Object.entries(final.hashes))assert.equal(sha(await readFile(resolve(runPath(id),file))),hash);
 const render=[];
 for(const width of [1280,320])for(const theme of ['light','dark']){
  const report=await read(`evidence-supplemental/${id}/browser/render-${theme}-${width}.json`),axe=await read(`evidence-supplemental/${id}/browser/axe-${theme}-${width}.json`);
  render.push({theme,width,...report,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 }
 candidates.push({id,initialTypecheck:initial.typecheck,initialBuild:initial.build,finalTypecheck:final.typecheck,finalBuild:final.build,lineCount:final.lineCount,initialAndFinalSourcesEqual:JSON.stringify(initial.hashes)===JSON.stringify(final.hashes),primaryInteractionsPassed:count(primary.results,false),primaryRendersPassed:count(primary.results,true),supplementalInteractionsPassed:count(supplemental.results,false),supplementalRendersPassed:count(supplemental.results,true),render});
}
const summary={collectedAt:new Date().toISOString(),candidateDenominator:4,interactionDenominator:12,renderDenominator:16,protocol,candidates};
await writeFile(resolve(root,'evidence-supplemental/summary.json'),JSON.stringify(summary,null,2),{flag:'wx'});console.log(JSON.stringify(summary));
