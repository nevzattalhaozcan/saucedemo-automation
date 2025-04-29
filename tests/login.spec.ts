import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/loginPage';
import usersJson from '../data/users.json';
import { readCSVFile } from '../utils/helpers';
import * as dotenv from 'dotenv';

dotenv.config();

const username = String(process.env.USERNAME);
const password = String(process.env.PASSWORD);
const usersCsv = readCSVFile('../data/users.csv');

test.describe('Login Tests', () => {

  let loginPage : LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login with valid credentials', async ({ page }) => {
    await loginPage.login(username, password);
    expect (page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

  test('login with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('login with empty username', async ({ page }) => {
    await loginPage.login('', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username is required');
  });

  test('login with empty password', async ({ page }) => {
    await loginPage.login('standard_user', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Password is required');
  });

  test('login with empty username and password', async ({ page }) => {
    await loginPage.login('', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username is required');
  });

  test('login with locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
  });

  test('login with problem user', async ({ page }) => {
    await loginPage.login('problem_user', 'secret_sauce');
    expect (page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

  test('login with performance glitch user', async ({ page }) => {
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    expect (page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

});

test.describe('data driven login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  
  for (const user of usersJson) {

    test.skip(`from json - login test ${usersJson.indexOf(user)+1} for: ${user.username || user.result}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({type: 'user', description: user.username || user.result});

      await test.step('fill in the login form', async () => {
        await loginPage.usernameInput.fill(user.username);
        await loginPage.passwordInput.fill(user.password);
      });

      await test.step('click the login button', async () => {
        await loginPage.loginButton.click();
      });

      await test.step('validate the login', async () => {
        if (user.result === 'success') {
          expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        }
        else if (user.result === 'locked out') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
        }
        else if (user.result === 'invalid credentials') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
        }
        else if (user.result === 'missing username') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username is required');
        }
        else if (user.result === 'missing password') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Password is required');
        }
        else if (user.result === 'missing username and password') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username is required');
        }
        else {
          throw new Error(`Unknown result type: ${user.result}`);
        }
      });

    });
  }

  for (const user of usersCsv) {
    test.skip(`from csv - login test ${usersCsv.indexOf(user)+1} for: ${user.username || user.result}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({type: 'user', description: user.username || user.result});

      await test.step('fill in the login form', async () => {
        await loginPage.usernameInput.fill(user.username);
        await loginPage.passwordInput.fill(user.password);
      });

      await test.step('click the login button', async () => {
        await loginPage.loginButton.click();
      });

      await test.step('validate the login', async () => {
        if (user.result === 'success') {
          expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        }
        else if (user.result === 'locked out') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
        }
        else if (user.result === 'invalid credentials') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
        }
        else if (user.result === 'missing username') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username is required');
        }
        else if (user.result === 'missing password') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Password is required');
        }
        else if (user.result === 'missing username and password') {
          const errorMessage = await loginPage.getErrorMessage();
          expect(errorMessage).toBe('Epic sadface: Username is required');
        }
        else {
          throw new Error(`Unknown result type: ${user.result}`);
        }
      });

    });
  
  }
  
});
