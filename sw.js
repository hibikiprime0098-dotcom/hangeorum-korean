const CACHE='hangeorum-v83-progress';
const CORE=[
  './','./index.html','./manifest.webmanifest','./icon.svg','./v81-patch-loader.js',
  './v82-core.js','./v82-g1.js','./v82-g2.js','./v82-g3.js','./v82-g4.js','./v82-g5.js',
  './v82-l1.js','./v82-l2.js','./v82-le1.js','./v82-le2.js','./v82-listen-ui.js','./v82-ui.js','./v83-progress.js'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
async function patchedNavigation(req){
  let r;
  try{r=await fetch(req,{cache:'no-store'})}catch(_){r=await caches.match('./index.html')}
  if(!r)return new Response('offline',{status:503});
  let html=await r.text();
  if(!html.includes('v81-patch-loader.js'))html=html.replace('</body>','<script src="./v81-patch-loader.js?v=830"></script></body>');
  else html=html.replace(/v81-patch-loader\.js\?v=\d+/g,'v81-patch-loader.js?v=830');
  return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache, no-store, must-revalidate'}});
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){e.respondWith(patchedNavigation(e.request));return;}
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
});
