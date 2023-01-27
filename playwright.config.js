import detect from 'is-port-reachable'

const reuseExistingServer = await detect(5173, { host: 'localhost' })

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer
  },
  testDir: 'tests'
}

export default config
