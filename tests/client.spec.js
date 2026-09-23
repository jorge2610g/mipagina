const {test,expect}=require('@playwright/test');
test('carga menú, categorías, productos y carrito',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#menu .item').first()).toBeVisible();await expect(page.locator('#cats .chip').first()).toBeVisible();await page.locator('[data-plus]').first().click();await expect(page.locator('#bar')).toBeVisible();await page.locator('#open-cart').click();await expect(page.locator('#sheet')).toBeVisible();expect(errors).toEqual([])});
test('es utilizable en teléfono',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#q')).toBeVisible();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);expect(overflow).toBe(false)});

test('usa modo oscuro como tema predeterminado',async({page})=>{await page.addInitScript(()=>localStorage.clear());await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('html')).toHaveAttribute('data-theme','dark');const colors=await page.locator('.hero').evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));expect(colors.background).toBe('rgb(0, 0, 0)');expect(colors.color).toBe('rgb(255, 255, 255)')});

async function diagnosePwaInstallability(page,context,url,label){
  await page.goto(url,{waitUntil:'domcontentloaded'});
  const sw=await page.evaluate(async()=>{
    if(!('serviceWorker' in navigator))return {supported:false};
    try{
      const reg=await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_,reject)=>setTimeout(()=>reject(new Error('service worker ready timeout')),7000))
      ]);
      return {supported:true,scope:reg.scope,controller:!!navigator.serviceWorker.controller};
    }catch(e){return {supported:true,error:String(e),controller:!!navigator.serviceWorker.controller}}
  });
  if(sw.supported&&!sw.controller&&!sw.error){
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForTimeout(500);
  }
  const cdp=await context.newCDPSession(page);
  const manifest=await cdp.send('Page.getAppManifest');
  const installability=await cdp.send('Page.getInstallabilityErrors');
  const report={label,url,sw,manifestUrl:manifest.url,manifestErrors:manifest.errors||[],installabilityErrors:installability.installabilityErrors||[]};
  console.log('PWA_DIAGNOSTIC '+JSON.stringify(report));
  expect(report.manifestErrors,JSON.stringify(report)).toEqual([]);
  expect(report.installabilityErrors,JSON.stringify(report)).toEqual([]);
}

test('diagnóstico PWA instalable: cliente',async({page,context})=>{await diagnosePwaInstallability(page,context,'/?demo=1','cliente')});
