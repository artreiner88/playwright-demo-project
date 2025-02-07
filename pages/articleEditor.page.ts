import { Page, Locator } from "@playwright/test";

export class ArticleEditor {
    
    readonly page: Page
    readonly titleField: Locator
    readonly descriptionField: Locator
    readonly textField: Locator
    readonly tagsField: Locator
    readonly publishButton: Locator

    constructor(page: Page) {
        this.page = page
        this.titleField = page.getByPlaceholder("Article Title")
        this.descriptionField = page.getByPlaceholder("What's this article about?")
        this.textField = page.getByPlaceholder("Write your article (in markdown)")
        this.tagsField = page.getByPlaceholder("Enter tags")
        this.publishButton = page.getByRole("button", { name: "Publish Article" })
    }

    async setTitle(title: string) {
        await this.titleField.fill(title)
    }

    async setDescription(description: string) {
        await this.descriptionField.fill(description)
    }

    async setText(text: string) {
        await this.textField.fill(text)
    }

    async setTags(tags: string[]) {
        for (const tag of tags) {
            await this.tagsField.fill(tag)
            await this.tagsField.press("Enter")
        }
    }

    async deleteTags(tags: string[]) {
        for (const tag of tags) {
            await this.page.getByText(tag).locator(".ion-close-round").click()
        }
    }

    async clickPublishBtn() {
        await this.publishButton.click()
    }
}