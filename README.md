# Playwright + TypeScript Automation Skeleton

This repository is a reusable, SUT-agnostic Playwright automation skeleton for learning and for starting UI and API test projects. **No SUT is configured yet.** Active framework code contains no application pages, credentials, endpoints, or business assertions.

## Architecture

- Playwright Test provides browser, page, request, retry, parallel, cross-browser, trace, screenshot, video, and HTML-report capabilities.
- TypeScript is configured for strict, no-emit type checking.
- Page objects keep SUT locators, reusable actions, and page state together.
- API clients build typed transport requests; specs own business assertions.
- Fixtures are test-scoped and provide an extension point for repeated SUT setup.
- `config/env.config.ts` is the single owner of local environment-file loading.
- Winston writes console and file logs. Do not log credentials, tokens, or personal data.

## Structure

```text
api/                 SUT API clients are added here
config/              environment configuration and .env.example
data/                optional, non-secret SUT test data
fixtures/            shared Playwright fixture extension point
pages/               BasePage and future SUT page objects
templates/           non-executable examples to copy and adapt
tests/framework/     local framework validation with no SUT dependency
tests/ui/            future UI specs
tests/api/           future API specs
utils/               cross-cutting utilities such as logging
```

`templates/` is intentionally outside Playwright's `tests/` directory. Template files are type-checked but never discovered or run as tests.

## Setup

Install exact locked dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

Copy the environment example:

```bash
cp config/.env.example config/.env
```

```env
BASE_URL=https://your-app.example
LOG_LEVEL=info
```

`config/.env` is ignored by Git. CI and shell variables override local `.env` values. `BASE_URL` is optional for the framework-only smoke test, but configure it before adding UI or API tests. Add SUT-specific variables—such as credentials—only when that SUT requires them, and store their CI values as secrets.

## Add a new SUT

1. Set `BASE_URL` for the application in `config/.env`.
2. Copy and rename a relevant file from `templates/`.
3. Add a page object under `pages/` for a UI feature, or an API client under `api/` for an API area.
4. Add SUT-specific UI and API specs under `tests/ui/` and `tests/api/`.
5. Add test-scoped fixtures only when they remove meaningful repeated setup.
6. Configure SUT secrets in CI and pass them to the test command.

To create a page object, extend `BasePage`, use relative routes with `navigate()`, and prefer `getByRole`, `getByLabel`, or `getByTestId` over fragile CSS selectors. Keep scenario assertions in specs unless they describe reusable page state.

To create an API client, inject Playwright's `APIRequestContext`, construct a focused resource request, and return a typed `APIResponse`. Do not create wrappers that merely duplicate `APIRequestContext`; assert a SUT's business contract in the spec.

For authentication, copy `templates/auth-fixture.template.ts` and replace its comment with the SUT's login or storage-state setup. Authentication assumptions do not belong in the core skeleton.

## Templates

- `page-object.template.ts` — page-object shape and accessible locator guidance.
- `ui-spec.template.ts` — UI scenario structure.
- `api-client.template.ts` — focused, typed API transport client.
- `api-spec.template.ts` — API contract assertion structure.
- `auth-fixture.template.ts` — authenticated fixture extension point.

Copy templates into active folders only after replacing every placeholder with the new SUT's contract.

## Run and validate

```bash
npm test                 # framework-only smoke test until SUT tests are added
npm run test:ui          # UI tests after they are added
npm run test:api         # API tests after they are added
npm run test:headed      # headed execution
npm run type-check       # strict TypeScript validation
npm run test:report      # open the HTML report
```

The Playwright configuration uses the configured `BASE_URL`, retries on CI, runs Chromium, Firefox, and WebKit, and supports parallel workers. On failure, it retains a trace, screenshot, and video in `test-results/`; use the HTML report or `npx playwright show-trace <trace.zip>` to inspect them.

## CI and Docker

GitHub Actions installs dependencies with `npm ci`, installs browsers, type-checks, runs tests, and uploads the HTML report plus raw test artifacts. The workflow intentionally has no SUT credentials or URL defaults. Add only the environment variables and secrets required by your new SUT.

Run the skeleton in Docker:

```bash
docker compose run --rm playwright-tests
```

Docker uses the matching Playwright image, an isolated `node_modules` volume, and `npm ci`. The mounted project lets `config/env.config.ts` load `config/.env`; override a value for one execution with `docker compose run -e BASE_URL=https://your-app.example playwright-tests`.

## Adapting to a different application

The core workflow stays the same for any application: define its environment values, model its pages or resources, add only its needed fixtures and test data, then write observable UI/API contracts. Nothing in the active framework assumes a login flow, account role, endpoint, selector, or business message.
