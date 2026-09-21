const CACHE='hangeorum-v1008-unified';
const CORE=[
  "./",
  "./index.html",
  "./base.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./v81-patch-loader.js",
  "./v82-core.js",
  "./v82-g1.js",
  "./v82-g2.js",
  "./v82-g3.js",
  "./v82-g4.js",
  "./v82-g5.js",
  "./v82-l1.js",
  "./v82-l2.js",
  "./v82-le1.js",
  "./v82-le2.js",
  "./v82-listen-ui.js",
  "./v82-ui.js",
  "./v83-progress.js",
  "./v84-tests.js",
  "./v85-learning.js",
  "./v86-grammar.js",
  "./v87-grammar-fix.js",
  "./v88-sharing.js",
  "./v89-growth-contrast.js",
  "./v90-restructure.js",
  "./v91-nav-visibility.js",
  "./v92b-vocab-levels.js",
  "./v92c-reading-growth.js",
  "./v93-auto-mastery.js",
  "./v94-vocab-consistency.js",
  "./v95-listening-reading-depth.js",
  "./v951-test-count.js",
  "./v953-promotion-same-format.js",
  "./v955-current-ui.js",
  "./v1000-latest-share.js",
  "./v1001-contrast-hotfix.js",
  "./v1002-mobile-polish.js",
  "./v1003-global-contrast.js",
  "./share/",
  "./share/index.html"
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