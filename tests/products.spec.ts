import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

const USERNAME = String(process.env.USERNAME);
const PASSWORD = String(process.env.PASSWORD);

test.describe('Cart Tests', () => {

  let productsPage: ProductsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
  });

  test('verify that all products load correctly on the Products page.', async ({ page }) => {
    const products = await productsPage.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  test('validate sorting products by Name (A to Z)', async ({ page }) => {
    const initialProductItems = await productsPage.getAllProducts();
    const initialProductNames = await Promise.all(initialProductItems.map(item => item.getName()));
    const expectedSortedNames = [...initialProductNames].sort();
    await productsPage.sortBy('az');
    const sortedProductItems = await productsPage.getAllProducts();
    const actualSortedNames = await Promise.all(sortedProductItems.map(item => item.getName()));
    expect(actualSortedNames).toEqual(expectedSortedNames);
  });

  test('validate sorting products by Name (Z to A)', async ({ page }) => {
    const initialProductItems = await productsPage.getAllProducts();
    const initialProductNames = await Promise.all(initialProductItems.map(item => item.getName()));
    const expectedSortedNames = [...initialProductNames].sort().reverse();
    await productsPage.sortBy('za');
    const sortedProductItems = await productsPage.getAllProducts();
    const actualSortedNames = await Promise.all(sortedProductItems.map(item => item.getName()));
    expect(actualSortedNames).toEqual(expectedSortedNames);
  });

  test('validate sorting products by Price (low to high)', async ({ page }) => {
    const initialProductItems = await productsPage.getAllProducts();
    const initialProductPrices = await Promise.all(initialProductItems.map(async item => {
      const priceText = await item.getPrice();
      return Number((priceText ?? '').replace(/[^0-9.]/g, ''));
    }));
    const expectedSortedPrices = [...initialProductPrices].sort((a, b) => a - b);
    await productsPage.sortBy('lohi');
    const sortedProductItems = await productsPage.getAllProducts();
    const actualSortedPrices = await Promise.all(sortedProductItems.map(async item => {
      const priceText = await item.getPrice();
      return Number((priceText ?? '').replace(/[^0-9.]/g, ''));
    }));
    expect(actualSortedPrices).toEqual(expectedSortedPrices);
  });

  test('validate sorting products by Price (high to low)', async ({ page }) => {
    const initialProductItems = await productsPage.getAllProducts();
    const initialProductPrices = await Promise.all(initialProductItems.map(async item => {
      const priceText = await item.getPrice();
      return Number((priceText ?? '').replace(/[^0-9.]/g, ''));
    }));
    const expectedSortedPrices = [...initialProductPrices].sort((a, b) => b - a);
    await productsPage.sortBy('hilo');
    const sortedProductItems = await productsPage.getAllProducts();
    const actualSortedPrices = await Promise.all(sortedProductItems.map(async item => {
      const priceText = await item.getPrice();
      return Number((priceText ?? '').replace(/[^0-9.]/g, ''));
    }));
    expect(actualSortedPrices).toEqual(expectedSortedPrices);
  });

  test('click on a product and verify product details (name, price, description)', async ({ page }) => {
    const product = products.find((p: any) => p.name === 'Sauce Labs Backpack') || products[0];
    await productsPage.gotoProductDetails(product.name);
    const productName = await productsPage.getProductName('Sauce Labs Backpack');
    const productPrice = await productsPage.getProductPrice('Sauce Labs Backpack');
    const productDescription = await productsPage.getProductDescription('Sauce Labs Backpack');
    expect(page.url()).toContain(`/inventory-item.html?id=${product.id}`);
    expect(productName).toBe(product.name);
    expect(productPrice).toBe(product.price);
    expect(productDescription).toBe(product.description);
  });

});  