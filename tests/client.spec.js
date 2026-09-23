const {test,expect}=require('@playwright/test');
test('carga menú, categorías, productos y carrito',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#menu .item').first()).toBeVisible();await expect(page.locator('#cats .chip').first()).toBeVisible();await page.locator('[data-plus]').first().click();await expect(page.locator('#bar')).toBeVisible();await page.locator('#open-cart').click();await expect(page.locator('#sheet')).toBeVisible();expect(errors).toEqual([])});
test('es utilizable en teléfono',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#q')).toBeVisible();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);expect(overflow).toBe(false)});

test('usa modo oscuro como tema predeterminado',async({page})=>{await page.addInitScript(()=>localStorage.clear());await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('html')).toHaveAttribute('data-theme','dark');const colors=await page.locator('.hero').evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));expect(colors.background).toBe('rgb(0, 0, 0)');expect(colors.color).toBe('rgb(255, 255, 255)')});

test('diagnóstico live WebAPK actual',async({browser})=>{
 const context=await browser.newContext();
 const page=await context.newPage();
 await page.goto('https://menu.yummypro.online/?demo=1',{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForTimeout(3000);
 try{
   await page.evaluate(async()=>{if('serviceWorker' in navigator)await navigator.serviceWorker.ready});
 }catch(_){}
 await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForTimeout(1200);
 const cdp=await context.newCDPSession(page);
 const manifest=await cdp.send('Page.getAppManifest');
 const installability=await cdp.send('Page.getInstallabilityErrors');
 const sw=await page.evaluate(async()=>({controller:!!navigator.serviceWorker?.controller,regs:'serviceWorker'in navigator?(await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,active:!!r.active})):[]}));
 const report={url:page.url(),manifestUrl:manifest.url,manifestErrors:manifest.errors||[],installabilityErrors:installability.installabilityErrors||[],sw};
 console.log('PWA_LIVE_INSTALLABILITY '+JSON.stringify(report));
 expect(report.manifestErrors,JSON.stringify(report)).toEqual([]);
 expect(report.installabilityErrors,JSON.stringify(report)).toEqual([]);
 expect(report.sw.controller,JSON.stringify(report)).toBe(true);
 await context.close();
});
