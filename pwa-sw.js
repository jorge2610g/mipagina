const YUMMYPRO_CLIENT_CACHE="yummypro-client-v1633-github-slug";
const CLIENT_CORE=["/offline.html","/manifest.webmanifest","/pwa-icon.svg","/icon-192.png","/icon-512.png","/apple-touch-icon.png"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(YUMMYPRO_CLIENT_CACHE).then(c=>c.addAll(CLIENT_CORE)));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith("yummypro-customer-")||k.startsWith("yummypro-client"))&&k!==YUMMYPRO_CLIENT_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",event=>{
 const req=event.request;if(req.method!=="GET")return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(CLIENT_CORE.includes(url.pathname)){
  event.respondWith(
   fetch(req,{cache:"no-store"}).then(async response=>{
    if(response?.ok){const cache=await caches.open(YUMMYPRO_CLIENT_CACHE);await cache.put(req,response.clone())}
    return response;
   }).catch(()=>caches.match(req).then(hit=>hit||caches.match(url.pathname)))
  );
  return;
 }
 if(req.mode==="navigate")event.respondWith(fetch(req).catch(()=>caches.match("/offline.html")));
});
self.addEventListener("push",event=>{
 let data={};try{data=event.data?.json()||{}}catch{data={body:event.data?.text()||"Tienes una actualización."}}
 event.waitUntil((async()=>{
  const windows=await clients.matchAll({type:"window",includeUncontrolled:true});
  const visible=windows.find(c=>c.visibilityState==="visible");
  if(data.onlyBackground&&visible){visible.postMessage({type:"yummypro-push",data});return}
  const options={body:data.body||"Tienes una actualización.",icon:"/icon-192.png",badge:"/icon-192.png",tag:data.tag||"yummypro-notification",renotify:true,silent:!!data.silent,requireInteraction:!!data.requireInteraction,data:{url:data.url||"/"}};
  if(!data.silent)options.vibrate=[220,100,220,100,350];
  await self.registration.showNotification(data.title||"YummyPro",options);
 })());
});
self.addEventListener("notificationclick",event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||"/",self.location.origin).href;
 event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const client of list){if(client.url.startsWith(self.location.origin)){client.navigate(target);return client.focus()}}return clients.openWindow(target)}));
});
