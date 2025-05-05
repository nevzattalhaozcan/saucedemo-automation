import { Locator } from '@playwright/test';

export class CartItem {
  readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
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

  async getQuantity() {
    return await this.root.getByTestId('item-quantity').textContent();
  }

  async isVisible() {
    return await this.root.isVisible();
  }
  async isHidden() {
    return await this.root.isHidden();
  }
}
