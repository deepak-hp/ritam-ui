import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { root } from './paths.mjs';
export async function serve(port=0) {
  const base=resolve(root,'builds');
  const server=createServer(async(req,res)=>{
    let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
    if(name==='/')name='/index.html'; if(name.endsWith('/'))name+='index.html';
    const file=resolve(base,'.'+name);
    if(!file.startsWith(base+sep)){res.writeHead(403).end();return;}
    try{const data=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.woff2':'font/woff2','.png':'image/png'})[extname(file)]??'application/octet-stream');res.end(data);}catch{res.writeHead(404).end('Candidate unavailable. See recorded build outcome.');}
  });
  await new Promise(done=>server.listen(port,'127.0.0.1',done));
  return {server,url:`http://127.0.0.1:${server.address().port}`};
}
if(process.argv[1]?.endsWith('server.mjs')){const {url}=await serve(Number(process.argv[2]??5187));console.log(`Review packet: ${url}`);}
