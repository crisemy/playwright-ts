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
- Git

### 2. Install Dependencies

Clone the repository and install the project dependencies:

```bash
npm install
```

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

Ensure your `config/.env` contains the required variables:

```env
BASE_URL=https://the-internet.herokuapp.com
ADMIN_USER=tomsmith
ADMIN_PASSWORD=SuperSecretPassword!
LOG_LEVEL=info
```

---

## Executing Tests

### Run all tests (UI & API)

```bash
npx playwright test
```

### Run only UI tests

```bash
npx playwright test tests/ui/
```

### Run only API tests

```bash
npx playwright test tests/api/
```

### Useful Flags

- `--headed`: Run tests visually with the browser UI.
- `--ui`: Open Playwright's interactive UI mode.
- `--project=chromium`: Run tests only on Google Chrome.
- `--debug`: Step through your tests with the Playwright inspector.

---

## Viewing Reports

After running tests, Playwright automatically generates an HTML report. To view it:

```bash
npx playwright show-report
```

---

## Running with Docker

If you want to run the tests in an isolated, headless container (mirroring exactly how CI runs them):

- **Build and Run:**

```bash
docker-compose up --build
```

This will spin up a container using the official Microsoft Playwright image and execute all tests.

- **Tear down:**

```bash
docker-compose down
```
