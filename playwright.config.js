/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  testMatch: '**/*.js',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true
  }
}

export default config
