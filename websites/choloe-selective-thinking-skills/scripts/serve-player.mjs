import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {parseArgs} from 'node:util';

const {values}=parseArgs({options:{port:{type:'string',default:'3030'}}});
const port=Number(values.port);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Port must be an integer between 1 and 65535.');
const root=path.resolve(import.meta.dirname,'../dist');
if(!fs.existsSync(path.join(root,'index.html')))throw new Error('Build the player first: npm run build:player');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.mp4':'video/mp4','.m4a':'audio/mp4','.mp3':'audio/mpeg','.wav':'audio/wav','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
    const headers={'Content-Type':types[path.extname(file)]??'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    let start=0, end=stat.size-1, status=200;
    if(req.headers.range){
      const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!range||(!range[1]&&!range[2])){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});res.end();return;}
      if(range[1]){
        start=Number(range[1]);
        if(range[2])end=Math.min(Number(range[2]),end);
      }else start=Math.max(0,stat.size-Number(range[2]));
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});res.end();return;}
      headers['Content-Range']='bytes '+start+'-'+end+'/'+stat.size;
      status=206;
    }
    res.writeHead(status,{...headers,'Content-Length':end-start+1});
    if(req.method==='HEAD'||!stat.size){res.end();return;}
    const stream=fs.createReadStream(file,{start,end});
    res.on('close',()=>stream.destroy());
    stream.on('error',()=>res.destroy());
    stream.pipe(res);
  });
}).listen(port,'127.0.0.1',()=>console.log(`Review player: http://localhost:${port}`));
