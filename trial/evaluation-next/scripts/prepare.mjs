import { readFile, writeFile, mkdir, cp, readdir, access } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { root, trial, ids, sha } from './paths.mjs';
try{await access(resolve(root,'materials/fingerprint.json'));throw new Error('Already frozen; do not regenerate');}catch(e){if(e.code!=='ENOENT')throw e;}
await mkdir(resolve(root,'materials/guidance'),{recursive:true});
await cp(resolve(trial,'dist'),resolve(root,'materials/package'),{recursive:true});
for(const file of ['README.md','COMPOSITION.md','contract.json'])await cp(resolve(trial,'ai',file),resolve(root,'materials/guidance',file));
await cp(resolve(trial,'docs/API-CONTRACTS.md'),resolve(root,'materials/guidance/API-CONTRACTS.md'));
await cp(resolve(trial,'ai/examples'),resolve(root,'materials/guidance/examples'),{recursive:true});
const brief=await readFile(resolve(root,'materials/brief.md'),'utf8');
const node='C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
const runs=[];
for(const [index,id] of ids.entries()) {
  const condition=index===0||index===3?'plain':'serein',repeat=index<2?1:2;
  const dir=resolve(root,'runs',id);await mkdir(dir,{recursive:true});
  const common=`You are a fresh generator for a small controlled UI comparison. Work independently. Read C:/Users/deepa/.codex/RTK.md before shell use (all commands start with rtk). Read only this prompt, the shared service and brand CSS, and condition-permitted materials. Do not inspect other candidates, old trial/evaluation, harness/browser code, condition-key, reviews or evidence belonging to others. Do not browse or spawn subagents. No approval/design interview is needed: the concrete brief is already approved.\n\n${brief}\n\nYour only authored output files are ${dir.replaceAll('\\','/')}/App.tsx and app.css. Include import './app.css'. No dependencies, package edits, tests, notes, generated declarations or extra source files. Your app must not import harness code or journal. The host provides React 19 and TypeScript, shared brand styling and service.\n\nAfter writing the initial files run: rtk \"${node}\" \"${resolve(root,'scripts/check.mjs').replaceAll('\\','/')}\" ${id} initial\nThis archives your exact first files before compilation. If compiler/build diagnostics fail, you may read only evidence/${id}/initial/typecheck.txt and build.txt, then make ONE compiler correction pass. No visual or browser checking and no behavioral redesign. If initial compiler/build passes, make no changes. In either case run the same command with final instead of initial once. If final fails, stop and retain the failure. Do not rerun an archived stage. Your two generated files must total at most 450 lines. Finish with a short factual status.\n`;
  const treatment=condition==='plain'?`Condition: plain React and CSS. Use semantic HTML, React and app.css. Do not import a component library or inspect Serein package, guidance, examples or source. You may read shared/service.ts and shared/brand.css.\n`:`Condition: Serein components plus current guidance. Use @serein-ui/react and @serein-ui/react/styles.css for applicable controls; custom semantic HTML/CSS for layout is allowed. Read materials/guidance/README.md, COMPOSITION.md and API-CONTRACTS.md. Inspect contract.json and package declarations as needed; supplied examples may be read but there is no file-review recipe. Do not invent APIs. The compiler/build aliases @serein-ui/react to the frozen materials/package snapshot. You may read shared/service.ts and shared/brand.css.\n`;
  const prompt=common+'\n'+treatment+`\nAll paths above are relative to ${root.replaceAll('\\','/')} unless absolute. Requested model: gpt-5.6-sol; reasoning effort: medium. One initial attempt plus at most one compiler correction.\n`;
  await writeFile(resolve(dir,'prompt.txt'),prompt);
  await writeFile(resolve(dir,'dispatch.txt'),`Read and execute the frozen generation prompt at ${dir.replaceAll('\\','/')}/prompt.txt. It contains the full approved task, allowed inputs/output paths and compiler commands. Follow its scope exactly. Do not inspect other candidates or browser/harness code.\n`);
  const manifest={id,task:'file-review',repeat,requestedModel:'gpt-5.6-sol',reasoningEffort:'medium',condition,promptSha256:sha(prompt),status:'not-started',startedAt:null,finishedAt:null,agentId:null};
  await writeFile(resolve(dir,'manifest.json'),JSON.stringify(manifest,null,2));runs.push({id,condition,repeat});
}
await writeFile(resolve(root,'condition-key.json'),JSON.stringify({note:'Keep separate from reviewer assets; not a credential.',runs},null,2));
const hashes={};
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=resolve(dir,entry.name);if(entry.isDirectory())await walk(file);else hashes[relative(root,file).replaceAll('\\','/')]=sha(await readFile(file));}}
for(const folder of ['materials','shared','scripts'])await walk(resolve(root,folder));
for(const id of ids)for(const file of ['prompt.txt','dispatch.txt'])hashes[`runs/${id}/${file}`]=sha(await readFile(resolve(root,'runs',id,file)));
const fingerprint={frozenAt:new Date().toISOString(),task:'file-review',requestedModel:'gpt-5.6-sol',reasoningEffort:'medium',candidateIds:ids,hashes};
await writeFile(resolve(root,'materials/fingerprint.json'),JSON.stringify(fingerprint,null,2));
console.log(JSON.stringify({frozenAt:fingerprint.frozenAt,fingerprintSha256:sha(await readFile(resolve(root,'materials/fingerprint.json'))),runs}));
