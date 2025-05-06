import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import * as dotenv from 'dotenv';

dotenv.config();

const USERNAME = String(process.env.USERNAME);
const PASSWORD = String(process.env.PASSWORD);
const taxRate = 0.08;

test.describe('Cart Tests', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let loginPage: LoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
  });

  test('add product to cart and start checkout (e2e)', async ({ page }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.gotoCart();
    const productPrice = await cartPage.getCartItemPrice('Sauce Labs Backpack');
    const productQuantity = await cartPage.getCartItemQuantity('Sauce Labs Backpack');
    const expectedItemTotal = productPrice * productQuantity;
    const expectedTax = (Math.round(Number((expectedItemTotal * taxRate).toFixed(2)) * 100)) / 100;
    const expectedTotal = expectedItemTotal + expectedTax;
    await cartPage.checkout();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    const paymentInfo = await checkoutPage.getPaymentInfo();
    const shippingInfo = await checkoutPage.getShippingInfo();
    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(paymentInfo).toBeTruthy();
    expect(shippingInfo).toBe('Free Pony Express Delivery!');
    expect(itemTotal).toBe(expectedItemTotal);
    expect(tax).toBe(expectedTax);
    expect(total).toBe(expectedTotal);
    await checkoutPage.clickFinish();
    const completeHeader = await checkoutPage.getCompleteHeader();
    const completeText = await checkoutPage.getCompleteText();
    expect(completeHeader).toBe('Thank you for your order!');
    expect(completeText).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await checkoutPage.clickBackHome();
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

});