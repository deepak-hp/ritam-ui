import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { trial } from './paths.mjs';
import { retainControls,waitDisabled } from './pending-controls.mjs';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(trial,'.playwright');
const {chromium}=await import('playwright');
test('pending control observation accepts changing names and rejects removed/enabled controls',async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage();
 try {
  for(const mode of ['native','aria']) {
   await page.setContent('<button>Approve selected</button><button>Reject selected</button>');
   const handles=await retainControls(page,['Approve selected','Reject selected']);
   await page.evaluate(mode=>{const controls=[...document.querySelectorAll('button')];controls[0].textContent='Approving…';for(const button of controls){if(mode==='native')button.disabled=true;else button.setAttribute('aria-disabled','true')}setTimeout(()=>{for(const button of controls){button.disabled=false;button.removeAttribute('aria-disabled')}controls[0].textContent='Approve selected'},350)},mode);
   await waitDisabled(page,handles);assert.equal(await handles[0].textContent(),'Approving…');
  }
  await page.setContent('<button>Approve selected</button>');
  const removed=await retainControls(page,['Approve selected']);
  await page.evaluate(()=>{const button=document.querySelector('button');button.disabled=true;button.remove()});
  await assert.rejects(waitDisabled(page,removed),/Timeout/);
  await page.setContent('<button>Approve selected</button>');
  await assert.rejects(waitDisabled(page,await retainControls(page,['Approve selected'])),/Timeout/);
 } finally {await browser.close();}
});
