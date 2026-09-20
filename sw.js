const CACHE='hangeorum-v1002-unified';
const CORE=[
  './',
  './index.html',
  './base.html',
  './manifest.webmanifest',
  './icon.svg',
  './v81-patch-loader.js',
  './share/',
  './share/index.html'
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
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .catch(()=>{
          const u=new URL(e.request.url);
          return u.pathname.includes('/share/')
            ? caches.match('./share/index.html')
            : caches.match('./index.html');
        })
    );
    return;
  }

  e.respondWith(
    fetch(e.request,{cache:'no-store'})
      .then(r=>{
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return r;
      })
      .catch(()=>caches.match(e.request))
  );
});