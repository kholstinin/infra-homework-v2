import { test, expect } from '@playwright/test';

function parseConfig(text) {
  return JSON.parse(text);
}

const expectedByEnv = {
  development: {
    APP_ENV: 'development',
    API_URL: 'https://dev-api.example.com',
    FEATURE_X_ENABLED: true,
  },
  staging: {
    APP_ENV: 'staging',
    API_URL: 'https://staging-api.example.com',
    FEATURE_X_ENABLED: false,
  },
  production: {
    APP_ENV: 'production',
    API_URL: 'https://api.example.com',
    FEATURE_X_ENABLED: false,
  }
};

test.describe('Runtime config', () => {
  test('should show correct config for current environment', async ({ page }) => {
    const CURRENT_ENV = process.env.ENV;

    if (!CURRENT_ENV) {
      throw new Error('ENV must be provided to Playwright test run');
    }

    await page.goto('http://localhost:3000');

    const configText = await page.locator('#config').innerText();
    const config = parseConfig(configText);

    const expected = expectedByEnv[CURRENT_ENV];

    expect(config.APP_ENV).toBe(expected.APP_ENV);
    expect(config.API_URL).toBe(expected.API_URL);
    expect(config.FEATURE_X_ENABLED).toBe(expected.FEATURE_X_ENABLED);
  });
});
