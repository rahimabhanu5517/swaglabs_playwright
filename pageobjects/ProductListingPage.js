const { clickElement, getTextContent } = require('../utils/common');

class ProductListingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header elements
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartLinkIcon = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');

    // Product list
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async getTitle() {
    return await getTextContent(this.pageTitle);
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async getProductName(index) {
    return await getTextContent(this.productNames.nth(index));
  }

  async getProductPrice(index) {
    return await getTextContent(this.productPrices.nth(index));
  }

  async addProductToCartByIndex(index) {
    const product = this.productItems.nth(index);
    const addButton = product.locator('button:has-text("Add to cart")');
    await clickElement(addButton);
  }

  async navigateToCart() {
    await clickElement(this.cartLinkIcon);
  }
}

module.exports = ProductListingPage;
