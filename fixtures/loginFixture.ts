// fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page, context }, use) => {
    await context.addCookies([{
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
      expires: Math.floor(new Date('2025-04-29T09:46:16.000Z').getTime() / 1000),
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }]);

    await page.goto('https://www.saucedemo.com');
    await page.evaluate(() => {
      localStorage.setItem('backtrace-guid', '1efb1610-045c-45ae-860e-12d457050dce');
      localStorage.setItem('backtrace-last-active', '1745848693125');
    });

    // use the page after it's authenticated
    await use(page);
  },
});
