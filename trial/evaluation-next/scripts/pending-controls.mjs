// Supplemental verifier helper: retain identity through a pending accessible-name change.
export async function retainControls(page,names) {
  const handles=await Promise.all(names.map(name=>page.getByRole('button',{name,exact:true}).elementHandle()));
  if(handles.some(handle=>!handle))throw new Error('Required resting decision control missing');
  return handles;
}
export async function waitDisabled(page,handles) {
  // Poll starts immediately after activation. Disconnected/replaced elements cannot pass.
  await page.waitForFunction(elements=>elements.every(element=>element.isConnected&&(element.matches(':disabled')||element.getAttribute('aria-disabled')==='true')),handles,{timeout:1000,polling:'raf'});
}
