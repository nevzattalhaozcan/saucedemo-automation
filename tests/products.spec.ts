import { test } from '../fixtures/loginFixture';
import { expect } from '@playwright/test';

test('bypass login using cookie and localStorage', async ({ page, context }) => {

  await page.goto('https://www.saucedemo.com/inventory.html');

  await expect(page.getByText('Products')).toBeVisible();
});
