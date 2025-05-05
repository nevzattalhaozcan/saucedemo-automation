import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from 'dotenv';

dotenv.config();

const USERNAME = String(process.env.USERNAME);
const PASSWORD = String(process.env.PASSWORD);

test.describe('Cart Tests', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
  });

  test('add a single product to the cart and verify it appears correctly', async ({ page }) => {
    const product = 'Sauce Labs Backpack';
    await productsPage.addProductToCart(product);
    const productName = await productsPage.getProductName(product);
    const productPrice = await productsPage.getProductPrice(product) || '0.00';
    await productsPage.gotoCart();
    const cartItemName = await cartPage.getCartItemName(productName);
    const cartItemPrice = await cartPage.getCartItemPrice(productPrice);
    const cartItemQuantity = await cartPage.getCartItemQuantity(productName);

    expect(cartItemName).toBe(productName);
    expect(cartItemPrice).toBe(productPrice);
    expect(cartItemQuantity).toBe('1');
  });

  test('add multiple products to the cart and verify all items are listed', async ({ page }) => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const expectedItems: { name: string; price: string }[] = [];
    for (const product of products) {
      await productsPage.addProductToCart(product);
      const productName = await productsPage.getProductName(product);
      const productPrice = await productsPage.getProductPrice(product) || '0.00';
      expectedItems.push({ name: productName, price: productPrice });
    }
    await productsPage.gotoCart();
    for (const item of expectedItems) {
      const cartItemName = await cartPage.getCartItemName(item.name);
      const cartItemPrice = await cartPage.getCartItemPrice(item.price);
      const cartItemQuantity = await cartPage.getCartItemQuantity(item.name);

      expect(cartItemName).toBe(item.name);
      expect(cartItemPrice).toBe(item.price);
      expect(cartItemQuantity).toBe('1');
    }
  });

  test('remove a product from the cart and verify it disappears.', async ({ page }) => {
    const product = 'Sauce Labs Backpack';
    await productsPage.addProductToCart(product);
    await productsPage.gotoCart();
    await cartPage.removeProductFromCart(product);
    const isHidden = await cartPage.isCartItemHidden(product);

    expect(isHidden).toBe(true);
  });

});