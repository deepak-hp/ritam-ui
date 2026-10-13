import { test } from 'node:test';
import assert from 'node:assert/strict';
test('fixture, rejection validation, failure retention, retry, immutable copies and eligibility',async()=>{
  const {getAssets,submitDecision,journal}=await import('../shared/service.ts');
  const initial=getAssets(); assert.equal(initial.length,5); assert.equal(initial.filter(a=>a.status==='pending').length,3);
  initial[0].name='Mutated'; assert.equal(getAssets()[0].name,'Homepage hero.png');
  for(const payload of [{ids:[],decision:'approved',reason:''},{ids:['a4'],decision:'approved',reason:''},{ids:['a5'],decision:'approved',reason:''},{ids:['a1','a1'],decision:'approved',reason:''},{ids:['a1'],decision:'rejected',reason:'  '}]) await assert.rejects(submitDecision(payload),/Choose pending/);
  const request={ids:['a1','a2'],decision:'rejected',reason:'Replace draft assets'};
  await assert.rejects(submitDecision(request),/unavailable/); assert.equal(getAssets()[0].status,'pending');
  const saved=await submitDecision(request); assert.deepEqual(saved.slice(0,2).map(a=>a.status),['rejected','rejected']); assert.equal(saved[0].reason,request.reason);
  assert.deepEqual(journal.slice(-2).map(e=>e.payload),[request,request]);
  await assert.rejects(submitDecision(request),/Choose pending/);
  const approved=await submitDecision({ids:['a3'],decision:'approved',reason:''}); assert.equal(approved[2].status,'approved');
});
