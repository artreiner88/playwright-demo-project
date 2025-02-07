import { Page, Locator } from "@playwright/test";

export class SignIn {

    readonly page: Page
    readonly signInButton: Locator
    readonly emailTextbox: Locator
    readonly passwordTextbox: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.getByText("Sign in")
        this.emailTextbox = page.getByRole("textbox", { name: "Email" })
        this.passwordTextbox = page.getByRole("textbox", { name: "Password" })
        this.submitButton = page.getByRole("button", { name: "Sign in" })
    }

    async signIn(email: string, password: string) {
        await this.signInButton.click()
        await this.emailTextbox.fill(email)
        await this.passwordTextbox.fill(password)
        await this.submitButton.click()
    }
}