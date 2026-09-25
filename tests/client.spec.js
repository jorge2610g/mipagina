const {test,expect}=require('@playwright/test');
test('carga menú, categorías, productos y carrito',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#menu .item').first()).toBeVisible();await expect(page.locator('#cats .chip').first()).toBeVisible();await page.locator('[data-plus]').first().click();await expect(page.locator('#bar')).toBeVisible();await page.locator('#open-cart').click();await expect(page.locator('#sheet')).toBeVisible();expect(errors).toEqual([])});
test('es utilizable en teléfono',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('#q')).toBeVisible();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);expect(overflow).toBe(false)});

test('usa modo oscuro como tema predeterminado',async({page})=>{await page.addInitScript(()=>localStorage.clear());await page.goto('/?demo=1',{waitUntil:'networkidle'});await expect(page.locator('html')).toHaveAttribute('data-theme','dark');const colors=await page.locator('.hero').evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));expect(colors.background).toBe('rgb(0, 0, 0)');expect(colors.color).toBe('rgb(255, 255, 255)')});


test('menú cliente acepta vista administrativa temporal', async ({ request }) => {
  const response=await request.get('/');
  expect(response.ok()).toBeTruthy();
  const body=await response.text();
  expect(body).toContain('admin_client_token_hash');
  expect(body).toContain('activate_admin_client_preview');
  expect(body).toContain('__adminClientPreview');
  expect(body).toContain('Admin prueba');
});
