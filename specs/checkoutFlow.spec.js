const { test, expect } = require("@playwright/test");
require("dotenv").config();

const localeText = require("../utils/localeText.json");
const getRandomIndices  = require("../utils/helper");

const UserAuthPage = require("../pageobjects/UserAuthPage");
const ProductListingPage = require("../pageobjects/ProductListingPage");
const ShoppingCartPage = require("../pageobjects/ShoppingCartPage");
const CheckoutFlowPage = require("../pageobjects/CheckoutFlowPage");

test("End-to-End Checkout Flow", async ({ page }) => {
  const authPage = new UserAuthPage(page);
  const listingPage = new ProductListingPage(page);
  const cartPage = new ShoppingCartPage(page);
  const checkoutPage = new CheckoutFlowPage(page);

  // Step 1: Login
  await authPage.navigateToLogin();
  await authPage.loginWithEnvData();
  await expect(await listingPage.getTitle()).toBe(localeText.pageHeadings.inventoryPage);

  // Step 2: Add 3 random products to cart
  const total = await listingPage.getProductCount();
  const indices = getRandomIndices(total, 3);

  for (const index of indices) {
    const name = await listingPage.getProductName(index);
    const price = await listingPage.getProductPrice(index);
    console.log(`Adding to cart: ${name} - ${price}`);
    await listingPage.addProductToCartByIndex(index);
  }

  // Step 3: Navigate to cart
  await listingPage.navigateToCart();
  await expect(await cartPage.getTitle()).toBe(localeText.pageHeadings.cartPage);

  // Step 4: Proceed to checkout
  await cartPage.proceedToCheckout();
  await expect(await checkoutPage.getCustomerInfoTitle()).toBe(localeText.pageHeadings.checkoutInfoPage);

  await checkoutPage.fillCustomerInfoStep(
    localeText.customerInfo.firstName,
    localeText.customerInfo.lastName,
    localeText.customerInfo.postalCode
  );

  // Step 5: Verify overview and finish order
  await expect(await checkoutPage.getOverviewPageTitle()).toBe(localeText.pageHeadings.checkoutOverviewPage);
  await checkoutPage.finishOrder();

  // Step 6: Order confirmation
  const confirmationTitle = await checkoutPage.getConfirmationMessage();
  const confirmationText = await checkoutPage.getConfirmationDescription();

  expect(confirmationTitle.trim()).toBe(localeText.orderStatus.confirmationTitle);
  expect(confirmationText.trim()).toBe(localeText.orderStatus.confirmationMessage);

  console.log('Flow completed')
});
