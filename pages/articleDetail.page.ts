import { Page, Locator } from "@playwright/test";

export class ArticleDetail {
    
    readonly page: Page
    readonly deleteButton: Locator
    readonly editButton: Locator
    readonly commentField: Locator
    readonly postCommentButton: Locator

    constructor(page: Page) {
        this.page = page
        this.deleteButton = page.getByRole("button", { name: "Delete Article "}).first()
        this.editButton = page.getByRole("link", { name: "Edit Article" }).first()
        this.commentField = page.getByPlaceholder("Write a comment...")
        this.postCommentButton = page.getByRole("button", { name: "Post Comment" })
    }

    async clickDeleteBtn() {
        await this.deleteButton.click()
    }

    async clickEditBtn() {
        await this.editButton.click()
    }

    async postComment(comment: string) {
        await this.commentField.fill(comment)
        await this.postCommentButton.click()
    }
}