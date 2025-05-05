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
    return (await this.root.getByTestId('inventory-item-price').textContent())?.substring(1);
  }

  async getName() {
    return (await this.root.getByTestId('inventory-item-name').textContent())?.trim();
  }

  async getDescription() {
    return (await this.root.getByTestId('inventory-item-desc').textContent())?.trim();
  }

  async clickTitle() {
    await this.root.getByTestId(/item-\d+-title-link/).click();
  }
}
