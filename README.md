# Saucedemo Automation

Automated end-to-end tests for [saucedemo.com](https://www.saucedemo.com) using [Playwright](https://playwright.dev/).

## Features

- Login tests (including data-driven from JSON and CSV)
- Product listing and sorting tests
- Cart and checkout flow tests
- Page Object Model structure
- CI integration with GitHub Actions (sharded test runs, HTML reports)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```
USERNAME=your_saucedemo_username
PASSWORD=your_saucedemo_password
BASE_URL=https://www.saucedemo.com
```

### Running Tests Locally

```sh
npx playwright test
```

To run a specific test file:

```sh
npx playwright test tests/login.spec.ts
```

### Viewing HTML Reports

After running tests:

```sh
npx playwright show-report
```

### Test Data

- User credentials: [`data/users.json`](data/users.json), [`data/users.csv`](data/users.csv)
- Product data: [`data/products.json`](data/products.json)

### Project Structure

- `pages/` - Page Object Model classes
- `tests/` - Test suites
- `utils/` - Helper utilities
- `fixtures/` - Playwright fixtures
- `.github/workflows/` - GitHub Actions CI config

### Continuous Integration

Tests run automatically on push/PR via [GitHub Actions workflow](.github/workflows/playwright.yml), with sharding and HTML report upload.

## Useful Commands

- Install Playwright browsers:  
  `npx playwright install --with-deps`
- Run tests with sharding:  
  `npx playwright test --shard=1/2`  
  `npx playwright test --shard=2/2`