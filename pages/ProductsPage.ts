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

  async getProductDescription(productName: string) {
    return String(await this.getInventoryItem(productName).getDescription());
  }

  async gotoCart() {
    await this.cartButton.click();
  }

  async getCartItemCount() {
    return await this.cartItemCount.textContent();
  }

  async getAllProducts() {
    const productElements = this.page.locator('[data-test="inventory-item"]');
    const products: InventoryItem[] = [];

    for (let i = 0; i < await productElements.count(); i++) {
      const itemRoot = productElements.nth(i);
      const item = new InventoryItem(itemRoot);
      products.push(item);
    }
    return products;
  }

  async sortBy(sortType: string) {
    const sortDropdown = this.page.getByTestId('product-sort-container');
    await sortDropdown.selectOption(sortType);
  }

  async gotoProductDetails(productName: string) {
    const product = this.getInventoryItem(productName);
    await product.clickTitle();
  }
}
