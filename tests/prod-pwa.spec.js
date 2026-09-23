const {test,expect}=require('@playwright/test');

const targets=[
  ['cliente','https://menu.yummypro.online/?demo=1'],
  ['restaurante landing','https://web.yummypro.online/'],
  ['restaurante panel','https://web.yummypro.online/panel/'],
  ['administrador','https://admin.yummypro.online/']
];

for(const [label,url] of targets){
 test('producción PWA: '+label,async({page,context})=>{
   await page.addInitScript(()=>{
     window.__pwaInstallPromptSeen=false;
     window.addEventListener('beforeinstallprompt',event=>{
       window.__pwaInstallPromptSeen=true;
       window.__pwaInstallPlatforms=event.platforms||[];
     });
   });
   await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForTimeout(3500);
   // tolerate one controller-change reload
   await page.waitForLoadState('domcontentloaded').catch(()=>{});
   await page.waitForTimeout(700);
   const pageInfo=await page.evaluate(async()=>{
     let regs=[];
     if('serviceWorker' in navigator){
       regs=(await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,active:!!r.active,waiting:!!r.waiting,installing:!!r.installing}));
     }
     const manifest=document.querySelector('link[rel="manifest"]');
     return {
       href:location.href,
       manifestHref:manifest?.href||null,
       displayStandalone:window.matchMedia('(display-mode: standalone)').matches,
       beforeInstallPromptSeen:!!window.__pwaInstallPromptSeen,
       platforms:window.__pwaInstallPlatforms||[],
       controller:!!navigator.serviceWorker?.controller,
       registrations:regs
     };
   });
   const cdp=await context.newCDPSession(page);
   const manifest=await cdp.send('Page.getAppManifest');
   const installability=await cdp.send('Page.getInstallabilityErrors');
   const report={
     label,url,pageInfo,
     manifestUrl:manifest.url,
     manifestErrors:manifest.errors||[],
     manifestData:manifest.data||null,
     installabilityErrors:installability.installabilityErrors||[]
   };
   console.log('PROD_PWA_DIAGNOSTIC '+JSON.stringify(report));
   expect(report.manifestErrors,JSON.stringify(report)).toEqual([]);
   expect(report.installabilityErrors,JSON.stringify(report)).toEqual([]);
 });
}
