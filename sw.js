const V='telebirr-v1';
const FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','assets/banner-fayda.png','assets/banner-zemen.png','assets/icon-parking.png','assets/icon-paybills.png','assets/icon-zemen.png','assets/logo-telebirr-black.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});
