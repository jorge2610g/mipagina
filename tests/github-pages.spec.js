const { test, expect } = require('@playwright/test');

test('RELEASE GATE: Cliente Pruebas carga correctamente desde GitHub Pages', async ({ page }) => {
  test.skip(!process.env.PAGES_TEST_URL, 'PAGES_TEST_URL solo existe en el smoke externo');

  const pageErrors = [];
  const serverErrors = [];
  page.on('pageerror', (error) => pageErrors.push(String(error?.message || error)));
  page.on('response', (response) => {
    if (response.status() >= 500 && response.url().startsWith(process.env.PAGES_TEST_URL)) {
      serverErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto(process.env.PAGES_TEST_URL, { waitUntil: 'domcontentloaded' });
  expect(response?.ok(), 'Cliente Pruebas no respondió correctamente').toBeTruthy();
  await expect(page).toHaveTitle(/Menú|Yummy/i);
  await expect(page.locator('body')).not.toBeEmpty();

  const html = await page.content();
  expect(html, 'Cliente Pruebas debe contener la configuración de Supabase Staging').toContain('wodqqheeesrelsbacmgx');

  const scopes = await page.evaluate(async () =>
    ('serviceWorker' in navigator)
      ? (await navigator.serviceWorker.getRegistrations()).map((registration) => registration.scope)
      : []
  );
  expect(Array.isArray(scopes)).toBeTruthy();

  expect(pageErrors, `Errores JavaScript detectados: ${pageErrors.join(' | ')}`).toEqual([]);
  expect(serverErrors, `Errores 5xx detectados: ${serverErrors.join(' | ')}`).toEqual([]);
});
