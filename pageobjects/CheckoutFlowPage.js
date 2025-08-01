
const { fillInput, clickElement, getTextContent } = require('../utils/common');

class CheckoutFlowPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step 1: Customer Information
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.cancelBtn = page.locator('#cancel');
    this.stepOneTitle = page.locator('[data-test="title"]');

    // Step 2: Order Overview
    this.overviewTitle = page.locator('[data-test="title"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.summaryInfo = page.locator('.summary_info');
    this.totalAmount = page.locator('.summary_total_label');
    this.finishBtn = page.locator('#finish');

    // Step 3: Confirmation
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeBtn = page.locator('#back-to-products');
  }

  // --- Step 1 ---
  async fillCustomerInfoStep(firstName, lastName, postalCode) {
    await fillInput(this.firstName, firstName);
    await fillInput(this.lastName, lastName);
    await fillInput(this.postalCode, postalCode);
    await clickElement(this.continueBtn);
  }

  async getCustomerInfoTitle() {
    return await getTextContent(this.stepOneTitle);
  }

  // --- Step 2 ---
  async getOverviewPageTitle() {
    return await getTextContent(this.overviewTitle);
  }

  async finishOrder() {
    await clickElement(this.finishBtn);
  }

  // --- Step 3 ---
  async getConfirmationMessage() {
    return await getTextContent(this.completeHeader);
  }

  async getConfirmationDescription() {
    return await getTextContent(this.completeText);
  }

  async returnToHome() {
    await clickElement(this.backHomeBtn);
  }
}

module.exports = CheckoutFlowPage;
