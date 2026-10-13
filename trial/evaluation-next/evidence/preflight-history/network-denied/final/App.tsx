import React,{useEffect,useRef,useState} from 'react';
import {getAssets,submitDecision,type Decision} from '../../shared/service';
import './app.css';
export default function App(){
 const [assets,setAssets]=useState(getAssets),[selected,setSelected]=useState<string[]>([]),[reject,setReject]=useState(false),[reason,setReason]=useState(''),[error,setError]=useState(''),[message,setMessage]=useState(''),[pending,setPending]=useState(false),[failed,setFailed]=useState<Decision|null>(null);
 const reasonRef=useRef<HTMLTextAreaElement>(null),allRef=useRef<HTMLInputElement>(null);
 const eligible=assets.filter(a=>a.status==='pending');
 useEffect(()=>{if(allRef.current)allRef.current.indeterminate=selected.length>0&&selected.length<eligible.length},[selected,eligible.length]);
 async function send(payload:Decision){setPending(true);setError('');try{setAssets(await submitDecision(payload));setSelected([]);setReject(false);setReason('');setFailed(null);setMessage('Review saved');}catch(e){setError((e as Error).message);setFailed(payload)}finally{setPending(false)}}
 return <main><h1>File review</h1><p>Demo data and simulated review service.</p><label><input ref={allRef} type="checkbox" aria-label="Select all pending files" checked={eligible.length>0&&selected.length===eligible.length} disabled={pending||!eligible.length} onChange={e=>setSelected(e.target.checked?eligible.map(a=>a.id):[])}/>Select all pending files</label>
 {assets.map(a=><fieldset key={a.id}><legend>{a.name}</legend><label><input type="checkbox" aria-label={'Select '+a.name} checked={selected.includes(a.id)} disabled={pending||a.status!=='pending'} onChange={e=>setSelected(e.target.checked?[...selected,a.id]:selected.filter(id=>id!==a.id))}/>Select {a.name}</label><p>{a.owner} · {a.kind} · {a.size} · {a.status}</p>{a.reason&&<p>{a.reason}</p>}</fieldset>)}
 <p>{selected.length} selected</p><button disabled={!selected.length||pending} onClick={()=>send({ids:selected,decision:'approved',reason:''})}>Approve selected</button><button disabled={!selected.length||pending} onClick={()=>setReject(true)}>Reject selected</button>
 {reject&&<div><label>Rejection reason<textarea ref={reasonRef} value={reason} disabled={pending} onChange={e=>setReason(e.target.value)}/></label><button disabled={pending} onClick={()=>{if(!reason.trim()){setError('Enter a rejection reason.');reasonRef.current?.focus();return}void send({ids:selected,decision:'rejected',reason})}}>Confirm rejection</button></div>}
 {error&&<div role="alert">{error}</div>}{failed&&<button disabled={pending} onClick={()=>send(failed)}>Retry decision</button>}<p role="status">{message}</p></main>
}