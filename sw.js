var C='pointpro-v2';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(
  caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return k!==C?caches.delete(k):null}))})
  .then(function(){return self.clients.claim()})});
self.addEventListener('fetch',function(e){
  e.respondWith(fetch(e.request).then(function(res){
    var cl=res.clone();caches.open(C).then(function(c){c.put(e.request,cl)});
    return res;
  }).catch(function(){
    return caches.match(e.request).then(function(r){return r||caches.match('./index.html')})
  }))});