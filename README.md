# Saucedemo Automation Project

This project uses [Playwright](https://playwright.dev/) to automate end-to-end testing for the Saucedemo web application. It is designed to ensure the reliability and functionality of the application through automated test scripts.

## Project Structure

- **Tests**: Contains test scripts for various features of the Saucedemo application.
- **Playwright Config**: Configuration file for Playwright settings such as browser options, test directory, and timeouts.
- **Helpers/Utils**: Utility functions or custom helpers to support test execution.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd saucedemo-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Update the Playwright configuration file (`playwright.config.ts`) to customize settings.

## Running Tests

To execute the tests, use the following commands:

- Run all tests:
  ```bash
  npx playwright test
  ```

- Run tests in a specific file:
  ```bash
  npx playwright test <test-file-name>
  ```

- Run tests with a specific browser:
  ```bash
  npx playwright test --project=chromium
  ```

- View the test report:
  ```bash
  npx playwright show-report
  ```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Saucedemo Website](https://www.saucedemo.com/)
