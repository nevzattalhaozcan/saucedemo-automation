import { Locator, Page } from '@playwright/test';
import { CartItem } from './CartItem';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  private getCartItem(productName: string): CartItem {
    const itemRoot = this.page.locator('[data-test="inventory-item"]', { hasText: productName });
    return new CartItem(itemRoot);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeProductFromCart(productName: string) {
    await this.getCartItem(productName).removeFromCart();
  }

  async getCartItemPrice(productName: string) {
    return String(await this.getCartItem(productName).getPrice());
  }

  async getCartItemName(productName: string) {
    return await this.getCartItem(productName).getName();
  }

  async getCartItemQuantity(productName: string) {
    return await this.getCartItem(productName).getQuantity();
  }

  async isCartItemVisible(productName: string) {
    return await this.getCartItem(productName).isVisible();
  }
  
  async isCartItemHidden(productName: string) {
    return await this.getCartItem(productName).isHidden();
  }
}
