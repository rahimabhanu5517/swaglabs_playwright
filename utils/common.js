/**
 * Fill any Playwright input element with value
 * @param {import('@playwright/test').Locator} locator
 * @param {string} value
 */
async function fillInput(locator, value) {
  await locator.fill(value);
}

/**
 * Click any element safely
 * @param {import('@playwright/test').Locator} locator
 */
async function clickElement(locator) {
  await locator.click();
}

/**
 * Get the text content of a locator
 * @param {import('@playwright/test').Locator} locator
 * @returns {Promise<string>}
 */
async function getTextContent(locator) {
  return await locator.textContent();
}

module.exports = {
  fillInput,
  clickElement,
  getTextContent,
};
