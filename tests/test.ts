import { expect, test } from '@playwright/test';

const URL_ROOT = '/';

test('root page should have title "Example App"', async ({ page }) => {
    await page.goto(URL_ROOT);
    await expect(page).toHaveURL(URL_ROOT);
    await expect(page).toHaveTitle('Example App');
});
