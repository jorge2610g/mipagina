const { test, expect } = require('@playwright/test');

test('Cliente Pruebas carga desde GitHub Pages', async ({ page }) => {
  const errors=[];
  page.on('pageerror', e=>errors.push(String(e.message||e)));
  const res=await page.goto(process.env.PAGES_TEST_URL,{waitUntil:'domcontentloaded'});
  expect(res?.ok()).toBeTruthy();
  await expect(page.locator('body')).not.toBeEmpty();
  expect(errors).toEqual([]);
  const html=await page.content();
  expect(html).toContain('wodqqheeesrelsbacmgx');
  const scopes=await page.evaluate(async()=>('serviceWorker' in navigator)?(await navigator.serviceWorker.getRegistrations()).map(r=>r.scope):[]);
  expect(Array.isArray(scopes)).toBeTruthy();
});
