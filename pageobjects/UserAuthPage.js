require('dotenv').config();

const { fillInput, clickElement } = require('../utils/common');

class UserAuthPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.signInButton = page.locator('#login-button');
    this.errorBanner = page.locator('.error-message-container');
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL);
  }

  async loginWithCredentials(username, password) {
    await fillInput(this.usernameField, username);
    await fillInput(this.passwordField, password);
    await clickElement(this.signInButton);
  }

  async loginWithEnvData() {

    await this.loginWithCredentials(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_PASSWORD
    );
  }

  async getLoginErrorText() {
    return await this.errorBanner.textContent();
  }
}

module.exports = UserAuthPage;