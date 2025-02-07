import { Page } from "@playwright/test";

export class Navigation {
    
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigateToSettings() {
        await this.page.getByText("Settings").click()
    }

    async navigateToCreateArticle() {
        await this.page.getByText("New Article").click()
    }

    async navigateToHome() {
        await this.page.getByText("Home").click()
    }
}