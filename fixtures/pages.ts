import { test as base } from "@playwright/test";
import { AppPageManager } from "../pages/appPageManager";

export const test = base.extend<({ pages: AppPageManager })>({

    pages: async({ page }, use) => {
        const pages = new AppPageManager(page)
        await use(pages)
        await page.close()
    }
})

export { expect } from "@playwright/test";