const { clickElement, getTextContent } = require('../utils/common');

class ShoppingCartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header title
    this.cartPageTitle = page.locator('[data-test="title"]');

    // Labels
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]');
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');

    // Cart items
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemDescriptions = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');

    // Buttons
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');

    this.removeButtons = page.locator('button[id^="remove-"]');
  }

  async getTitle() {
    return await getTextContent(this.cartPageTitle);
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemDetails(index) {
    return {
      name: await getTextContent(this.itemNames.nth(index)),
      description: await getTextContent(this.itemDescriptions.nth(index)),
      price: await getTextContent(this.itemPrices.nth(index)),
    };
  }

  async proceedToCheckout() {
    await clickElement(this.checkoutBtn);
  }

  async continueShopping() {
    await clickElement(this.continueShoppingBtn);
  }
}

module.exports = ShoppingCartPage;
