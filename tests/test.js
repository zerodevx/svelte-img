import { expect, test } from '@playwright/test'

test('basic - variants are generated', async ({ page }) => {
  await page.goto('/')
  const sources = page.locator('.test-basic picture source')
  await expect(sources).toHaveCount(3)
  const img = page.locator('.test-basic img')
  expect(await img.getAttribute('style')).toContain('data:image/webp;base64')
})

test('dominant colour lqip', async ({ page }) => {
  await page.goto('/')
  const img = page.locator('.test-1px')
  expect(await img.getAttribute('style')).toContain('rgb(')
})

test('single image does not render picture', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('.test-single picture').count()).toBe(0)
})

test('lqip can be disabled', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('.test-single img').getAttribute('style')).toBeNull
})

test('falls back to standard imagetools without run directive', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('.test-fallback').innerText()).toContain('@imagetools')
})

/*
test('', async ({ page }) => {
  await page.goto('/')
})
*/
