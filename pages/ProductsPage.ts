import { Locator, Page } from '@playwright/test';
import { InventoryItem } from './InventoryItem';

export class ProductsPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.cartItemCount = page.getByTestId('shopping-cart-badge');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  private getInventoryItem(productName: string): InventoryItem {
    const itemRoot = this.page.locator('[data-test="inventory-item"]', { hasText: productName });
    return new InventoryItem(itemRoot);
  }

  async addProductToCart(productName: string) {
    await this.getInventoryItem(productName).addToCart();
  }

  async removeProductFromCart(productName: string) {
    await this.getInventoryItem(productName).removeFromCart();
  }

  async getProductPrice(productName: string) {
    return await this.getInventoryItem(productName).getPrice();
  }

  async getProductName(productName: string) {
    return String(await this.getInventoryItem(productName).getName());
  }

  async gotoCart() {
    await this.cartButton.click();
  }

  async getCartItemCount() {
    return await this.cartItemCount.textContent();
  }
}
