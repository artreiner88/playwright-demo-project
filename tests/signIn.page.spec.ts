import { test, expect } from "../fixtures/pages";

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL)
})

test("Sign in", async ({ pages }) => {
    const { signIn } = pages
    await signIn.signIn(process.env.EMAIL, process.env.PASSWORD)
    await expect(signIn.page.getByText(process.env.USERNAME)).toBeVisible()
})