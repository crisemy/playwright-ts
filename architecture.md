# Architecture documentation
I have successfully set up the complete architecture you requested. It follows the Page Object Model (POM) and uses best practices suitable for a QA Architect, including proper logging, custom test fixtures, environment variables configurations, and test data separation.

Here is the architectural structure and what each folder/file does:

## Architecture Structure

- config/: Manages environment variables and framework configuration    .
    - .env: Stores variables like BASE_URL, ADMIN_USER, and LOG_LEVEL.
    - env.config.ts: Safely loads and exports environment variables using dotenv.

- utils/: Holds helper functions and cross-cutting concerns.
    - logger.ts: Robust custom logger configured with winston. It formats messages, prints them to the console, and outputs them to the logs/ directory.

- pages/: Contains the Page Object Models.
    - base.page.ts: The core Page Object. It abstracts fundamental actions like navigating, clicking, typing, and logging those interactions. All specific pages inherit from this.
    - login.page.ts: Extends BasePage. It defines selectors and logic unique to the login view on "The Internet" demo app, wrapping everything in reusable methods.

- fixtures/: Playwright test fixture definitions.
    - test.fixture.ts: Automatically sets up and injects the instantiated Page Objects (e.g., loginPage) into your tests, dramatically keeping your tests completely independent and reducing boilerplate.

- data/: Stores static test data to avoid hardcoding strings into test files.
    - testData.json: An example file mapping a negative login attempt user.

- api/: Contains API Object Models (AOM) for encapsulating backend requests.
    - status-codes.client.ts: A client object to wrap the endpoints at `/status_codes`, managing GET requests and response assertions.

- tests/: Contains your test specifications divided by testing scope.
    - ui/: Holds end-to-end browser tests.
        - login.spec.ts: A fully functional end-to-end test validating the login.page.ts using the POM pattern.
    - api/: Holds API and backend-focused tests.
        - status-codes.spec.ts: Validates HTTP status code responses directly using Playwright's `request` fixture.
    
## Actions Performed
1. Installed dotenv and winston as dependencies via npm.
2. Formatted playwright.config.ts to correctly parse config/.env using the absolute path resolver.
3. Wrote all the logic and classes for the structure described above.
4. Deleted the default tests/example.spec.ts boilerplate.
5. Fired off npx playwright test to validate the setup. All 6 tests passed flawlessly across Chromium, Firefox, and WebKit on your environment!

## Libraries
1. dotenv (Environment Variable Management)
    - What it is: A zero-dependency module that loads environment variables from a .env file into Node.js's process.env.
    - Why we use it: Security and Flexibility. Hardcoding passwords, API keys, or URLs directly into your source code is a major security risk and bad practice. If you need to switch your tests from a staging environment (staging.the-internet.com) to production (the-internet.herokuapp.com), you shouldn't have to rewrite your code. dotenv allows you to store these configurations securely outside your codebase. You simply update the .env file or pass variables via your CI/CD pipeline (like Jenkins or GitHub Actions), and the framework adapts automatically.

2. path (File Path Resolution)
    - What it is: A core module built directly into Node.js (which is why you didn't see me install it with npm) used for handling file and directory paths.
    - Why we use it: Reliability. When you run tests from different folders or inside a CI/CD server, relative paths (like "./.env") can easily break. By using path.resolve(__dirname, '.env'), we dynamically construct an absolute path based on exactly where the env.config.ts file lives on the hard drive. This guarantees that your framework will always successfully locate the .env file, no matter where the execution command was triggered from.

3. winston (Advanced Logging)
    - What it is: The most popular and robust logging library in the Node.js ecosystem.
    - Why we use it: While you could just use console.log("Clicked login"), a mature automation framework needs much more power. winston gives you:
        - Log Levels: It supports levels like error, warn, info, and debug. You can configure your framework to only output error messages during regular runs to keep the console clean, but switch it to debug when you need to deeply troubleshoot a failing test.
        - Formatting: It allows us to attach exact timestamps and color-coding to every action (e.g., 2026-05-05 16:32:21 [info]: Clicking element: locator('#password')). This is critical when trying to figure out when and where a test hung up.
        - Transports (File Saving): In the setup I provided (utils/logger.ts), Winston doesn't just print to the terminal—it simultaneously writes the logs to actual files (logs/error.log and logs/combined.log). If a test suite runs overnight on a server and fails, those physical log files are the first place an engineer will look to figure out what happened.

In short: dotenv keeps your framework secure and adaptable, path makes it crash-proof across different file systems, and winston provides the professional paper trail needed to maintain thousands of tests!