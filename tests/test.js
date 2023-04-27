import { expect, test } from '@playwright/test'

test('default variants are generated', async ({ page }) => {
  await page.goto('/test')
  const data = JSON.parse((await page.getByTestId('basic').textContent()) || '')
  expect(data.length).toBe(10)
  expect(data.filter((i) => i.format === 'jpg').length).toBe(3)
  expect(data.filter((i) => i.format === 'avif').length).toBe(3)
  expect(data.filter((i) => i.format === 'webp').length).toBe(4)
  expect(data.filter((i) => i.width === 480).length).toBe(3)
  expect(data.filter((i) => i.width === 1024).length).toBe(3)
  expect(data.filter((i) => i.width === 1920).length).toBe(3)
  const { base64 } = data.find((i) => i.format === 'webp' && i.width === 16)
  expect(base64).toContain('data:image/webp;base64')
})

test('no lqip', async ({ page }) => {
  await page.goto('/test')
  const data = JSON.parse((await page.getByTestId('nolqip').textContent()) || '')
  expect(data.length).toBe(9)
  expect(data.find((/** @type {{ base64: any; }} */ i) => i.base64)).toBe(undefined)
})

test('width override', async ({ page }) => {
  await page.goto('/test')
  const data = JSON.parse((await page.getByTestId('width').textContent()) || '')
  expect(data.length).toBe(7)
  expect(data.filter((i) => i.width === 480).length).toBe(3)
  expect(data.filter((i) => i.width === 1024).length).toBe(3)
})

test('returns a path by default', async ({ page }) => {
  await page.goto('/test')
  const data = JSON.parse((await page.getByTestId('default').textContent()) || '')
  expect(data).toBe(`/src/routes/cat01.jpg`)
})