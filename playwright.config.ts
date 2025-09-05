import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run build && npm run preview',
        port: 4173,
    },
    timeout: 10 * 1000,
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    projects: [
        /* Test against desktop browsers */
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        /* Test against mobile viewports. */
        {
            name: 'chrome-mobile',
            use: { ...devices['Pixel 8'] },
        },
        {
            name: 'safari-mobile',
            use: { ...devices['iPhone 14'] },
        },
        /* Test against branded browsers. */
        {
            name: 'google-chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
    ],
    reporter: process.env.CI ? 'blob' : 'line',
};

export default config;
