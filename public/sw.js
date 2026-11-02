const CACHE='fagelspar-v13';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/index.html','/style.css','/design.js','/forest-dawn.svg','/app.js','/extras.js','/location.js','/live.js','/account.js','/maps.js','/species.js','/profile.js','/heatmap.js','/vendor/leaflet/leaflet.js','/vendor/leaflet/leaflet.css','/catalogue.js','/manifest.webmanifest','/icon.svg','/icon-180.png','/icon-192.png','/icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(new URL(e.request.url).pathname.startsWith('/api/'))return;if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('/index.html'):Response.error()))))});

self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("/"))});
