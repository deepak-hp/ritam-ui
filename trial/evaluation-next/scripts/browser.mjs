import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root, trial, runPath, sha } from './paths.mjs';
import { serve } from './server.mjs';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(trial,'.playwright');
const { chromium } = await import('playwright');
const id=process.argv[2], out=resolve(root,'evidence',id,'browser');
await mkdir(resolve(out,'screenshots'),{recursive:true});
try {await access(resolve(out,'browser.json'));throw new Error('Browser measurement already archived; no overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
const provenance={measuredAt:new Date().toISOString(),verifierSha256:sha(await readFile(new URL(import.meta.url))),node:process.version,playwright:JSON.parse(await readFile(resolve(trial,'node_modules/playwright/package.json'),'utf8')).version};
const checksBytes=await readFile(resolve(root,'evidence',id,'final/check.json')).catch(()=>null);
const checks=checksBytes?JSON.parse(checksBytes):null;
provenance.checkReportSha256=checksBytes?sha(checksBytes):null;
const results=[];
const record=async()=>{const result={id,provenance,results};await writeFile(resolve(out,'browser.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));};
if(!checks||checks.typecheck||checks.build){results.push({name:'browser',status:'blocked',reason:'No successful final compiler/build record'});await record();}
else {
  for(const file of ['App.tsx','app.css','prompt.txt'])assert.equal(sha(await readFile(resolve(runPath(id),file))),checks.hashes[file],`Source changed after compiler check: ${file}`);
  const {server,url}=await serve(); let browser;
  const button=(p,name)=>p.getByRole('button',{name,exact:true});
  const checkbox=(p,name)=>p.getByRole('checkbox',{name,exact:true});
  const journal=p=>p.evaluate(()=>window.__reviewJournal);
  const waitJournal=(p,length)=>p.waitForFunction(n=>window.__reviewJournal.length>=n,length);
  const names=['Homepage hero.png','Product walkthrough.mp4','Accessibility review notes.pdf'];
  async function tabTo(page,control) {
    for(let i=0;i<60;i++){await page.keyboard.press('Tab');if(await control.evaluate(el=>el===document.activeElement||el.contains(document.activeElement)))return;}
    throw new Error('Control was not reachable in 60 Tab presses');
  }
  async function scenario(name,fn,{width=1280,theme='light'}={}) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});page.setDefaultTimeout(3000);
    try{await page.goto(`${url}/${id}/?theme=${theme}`);await page.waitForFunction(()=>document.getElementById('root')?.childElementCount>0);await fn(page);results.push({name,status:'pass'});}
    catch(e){results.push({name,status:'fail',message:e.message});await page.screenshot({path:resolve(out,'screenshots',`${name}-failure.png`),fullPage:true}).catch(()=>{});}
    finally{await page.close();}
  }
  try {
    browser=await chromium.launch({headless:true});
    const axe=await readFile(resolve(trial,'node_modules/axe-core/axe.min.js'),'utf8');
    for(const width of [1280,320])for(const theme of ['light','dark']) {
      await scenario(`render-${theme}-${width}`,async page=>{
        const errors=[];page.on('pageerror',e=>errors.push(e.message));
        await page.reload();await page.waitForFunction(()=>document.getElementById('root')?.childElementCount>0);
        await page.getByRole('heading',{name:'File review',exact:true,level:1}).waitFor();
        await page.getByRole('main').waitFor();
        await page.screenshot({path:resolve(out,'screenshots',`${theme}-${width}.png`),fullPage:true});
        const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
        await page.addScriptTag({content:axe});
        const report=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
        await writeFile(resolve(out,`axe-${theme}-${width}.json`),JSON.stringify(report,null,2));
        await writeFile(resolve(out,`render-${theme}-${width}.json`),JSON.stringify({overflow,errors,axeViolations:report.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length}))},null,2));
        assert.deepEqual(errors,[],'Console/runtime errors');assert.ok(overflow.scroll<=overflow.client+1,'Page horizontal overflow');assert.equal(report.violations.length,0,'axe violations (see separate report)');
      },{width,theme});
    }
    await scenario('eligibility-and-bulk',async page=>{
      for(const name of names)assert.equal(await checkbox(page,`Select ${name}`).isEnabled(),true);
      for(const name of ['Campaign copy.docx','Unlicensed soundtrack.wav'])assert.equal(await checkbox(page,`Select ${name}`).isDisabled(),true);
      assert.equal(await button(page,'Approve selected').isDisabled(),true);assert.equal(await button(page,'Reject selected').isDisabled(),true);
      await checkbox(page,'Select all pending files').click();for(const name of names)assert.equal(await checkbox(page,`Select ${name}`).isChecked(),true);
      await checkbox(page,'Select all pending files').click();for(const name of names)assert.equal(await checkbox(page,`Select ${name}`).isChecked(),false);
      assert.deepEqual(await journal(page),[]);
    });
    await scenario('rejection-validation-failure-retry',async page=>{
      await checkbox(page,`Select ${names[0]}`).click();await checkbox(page,`Select ${names[1]}`).click();
      await button(page,'Reject selected').click();const reason=page.getByRole('textbox',{name:'Rejection reason',exact:true});
      await reason.fill('   ');await button(page,'Confirm rejection').click();
      await page.waitForFunction(el=>el===document.activeElement||el.contains(document.activeElement),await reason.elementHandle());
      assert.deepEqual(await journal(page),[],'Whitespace reason must not reach service');
      await reason.fill('Replace the draft assets');await button(page,'Confirm rejection').click();
      assert.equal(await button(page,'Confirm rejection').isDisabled(),true,'Confirm disabled during submission');
      assert.equal(await button(page,'Approve selected').isDisabled(),true,'Approve disabled during submission');
      assert.equal(await button(page,'Reject selected').isDisabled(),true,'Reject disabled during submission');
      await page.keyboard.press('Enter');await page.keyboard.press('Enter');await waitJournal(page,1);
      await page.getByRole('alert').filter({hasText:'Review service unavailable'}).waitFor();
      assert.equal(await reason.inputValue(),'Replace the draft assets');for(const name of names.slice(0,2))assert.equal(await checkbox(page,`Select ${name}`).isChecked(),true);
      await button(page,'Retry decision').click();await waitJournal(page,2);
      const entries=await journal(page);assert.deepEqual(entries.map(e=>e.outcome),['failure','success']);assert.deepEqual(entries[0].payload,entries[1].payload);assert.deepEqual([...entries[1].payload.ids].sort(),['a1','a2']);assert.equal(entries[1].payload.decision,'rejected');assert.equal(entries[1].payload.reason,'Replace the draft assets');
      for(const name of names.slice(0,2)){assert.equal(await checkbox(page,`Select ${name}`).isDisabled(),true);assert.equal(await checkbox(page,`Select ${name}`).isChecked(),false);}
      await page.getByRole('status').filter({hasText:/./}).first().waitFor();
    });
    await scenario('keyboard-approval-failure-retry',async page=>{
      await tabTo(page,checkbox(page,'Select all pending files'));await page.keyboard.press('Space');
      await tabTo(page,button(page,'Approve selected'));await page.keyboard.press('Enter');
      assert.equal(await button(page,'Approve selected').isDisabled(),true,'Approve disabled during submission');
      assert.equal(await button(page,'Reject selected').isDisabled(),true,'Reject disabled during submission');
      await page.keyboard.press('Enter');await page.keyboard.press('Enter');await waitJournal(page,1);
      await tabTo(page,button(page,'Retry decision'));await page.keyboard.press('Enter');await waitJournal(page,2);
      const entries=await journal(page);assert.deepEqual(entries.map(e=>e.outcome),['failure','success']);assert.deepEqual(entries[0].payload,entries[1].payload);assert.deepEqual([...entries[1].payload.ids].sort(),['a1','a2','a3']);assert.equal(entries[1].payload.decision,'approved');
      for(const name of names){assert.equal(await checkbox(page,`Select ${name}`).isDisabled(),true);assert.equal(await checkbox(page,`Select ${name}`).isChecked(),false);}
      assert.equal(await button(page,'Approve selected').isDisabled(),true);
    });
  }catch(e){results.push({name:'harness',status:'blocked',message:e.stack??String(e)});}
  finally{await browser?.close();await new Promise(done=>server.close(done));await record();}
}
