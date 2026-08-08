# QA Automation Architecture - Playwright TypeScript

This repository implements an enterprise-grade test automation framework using Playwright, TypeScript, and the Page Object Model (POM).

## Architecture Highlights

- **UI Testing**: Handled via Page Object Models inside the `pages/` directory.
- **API Testing**: Handled via API Object Models inside the `api/` directory using Playwright's `request` fixture.
- **Environment Management**: Utilizes `dotenv` to abstract configurations from the source code.
- **Logging**: Configured with `winston` to generate detailed timestamps and error trails in the `logs/` directory.
- **Continuous Integration**: Fully configured GitHub Actions workflow.
- **Containerization**: Included Docker setup for consistent testing across environments.

---

## Setup & Installation

### 1. Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)

### 2. Install Dependencies

Clone the repository and install the exact dependency versions from the lockfile:

```bash
npm ci
```

Use `npm install` only when intentionally adding or updating a dependency.

### 3. Install Browsers

Download the required Playwright browser binaries:

```bash
npx playwright install
```

### 4. Configure Environment Variables

We use environment variables to keep our tests secure and adaptable.
Copy the `.env.example` file to create your local `.env` file:

```bash
cp config/.env.example config/.env
```

Ensure your `config/.env` contains the required variables. Below is just an example:

```env
BASE_URL=
ADMIN_USER=
ADMIN_PASSWORD=
LOG_LEVEL=info
```

`config/.env` is local-only and ignored by Git. Commit changes to
`config/.env.example` when the required configuration shape changes.

`config/env.config.ts` is the sole loader for this file. Environment variables
provided by CI or your shell take precedence over local values.

---

## Executing Tests

### Run all tests (UI & API)

```bash
npm test
```

### Run only UI tests

```bash
npm run test:ui
```

### Run only API tests

```bash
npm run test:api
```

### Type-check the Framework

Run this before opening a pull request or when changing TypeScript code:

```bash
npm run type-check
```

The GitHub Actions workflow runs the same command before the test suite.

### Useful Flags

- `--headed`: Run tests visually with the browser UI.
- `--ui`: Open Playwright's interactive UI mode.
- `--project=chromium`: Run tests only on Google Chrome.
- `--debug`: Step through your tests with the Playwright inspector.

For a headed run, use:

```bash
npm run test:headed
```

---

## Viewing Reports

After running tests, Playwright automatically generates an HTML report. To view it:

```bash
npm run test:report
```

---

## Running with Docker

If you want to run the tests in an isolated, headless container:

- **Build and Run:**

```bash
docker compose run --rm playwright-tests
```

This runs the official Microsoft Playwright image and executes the full suite.

Docker runs `npm ci` and uses an isolated container `node_modules` volume. It
loads `config/.env` from the mounted project; override an individual value for
one execution with `docker compose run -e BASE_URL=https://example.test playwright-tests`.

The `--rm` flag removes the one-off container when the test command exits.
