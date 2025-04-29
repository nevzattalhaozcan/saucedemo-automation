import { Locator } from '@playwright/test';

export class InventoryItem {
  readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  async addToCart() {
    await this.root.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeFromCart() {
    await this.root.getByRole('button', { name: /remove/i }).click();
  }

  async getPrice() {
    return await this.root.getByTestId('inventory-item-price').textContent();
  }

  async getName() {
    return (await this.root.getByTestId('inventory-item-name').textContent())?.trim();
  }
}
