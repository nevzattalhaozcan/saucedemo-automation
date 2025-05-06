import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.paymentInfo = page.getByTestId('payment-info-value');
    this.shippingInfo = page.getByTestId('shipping-info-value');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
    this.finishButton = page.getByTestId('finish');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async getPaymentInfo() {
    return await this.paymentInfo.textContent();
  }

  async getShippingInfo() {
    return await this.shippingInfo.textContent();
  }

  async getItemTotal() {
    const itemTotalText = await this.itemTotal.textContent();
    const itemTotalValue = itemTotalText?.match(/[\d.]+/);
    const itemTotal = itemTotalValue ? Number(itemTotalValue[0]) : null;
    return itemTotal;
  }

  async getTax() {
    const taxText = await this.tax.textContent();
    const taxValue = taxText?.match(/[\d.]+/);
    const tax = taxValue ? Number(taxValue[0]) : null;
    return tax;
  }

  async getTotal() {
    const totalText = await this.total.textContent();
    const totalValue = totalText?.match(/[\d.]+/);
    const total = totalValue ? Number(totalValue[0]) : null;
    return total;
  }

  async getCompleteHeader() {
    return await this.completeHeader.textContent();
  }

  async getCompleteText() {
    return await this.completeText.textContent();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

}