const CACHE='hangeorum-v87-final';
const CORE=[
  './','./index.html','./base.html','./manifest.webmanifest','./icon.svg','./v81-patch-loader.js',
  './v82-core.js','./v82-g1.js','./v82-g2.js','./v82-g3.js','./v82-g4.js','./v82-g5.js',
  './v82-l1.js','./v82-l2.js','./v82-le1.js','./v82-le2.js','./v82-listen-ui.js','./v82-ui.js','./v83-progress.js','./v84-tests.js','./v85-learning.js','./v86-grammar.js','./v87-grammar-fix.js'
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
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>r).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
    const copy=r.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return r;
  }).catch(()=>caches.match(e.request)));
});
