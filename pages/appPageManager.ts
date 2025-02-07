import { Page } from "@playwright/test";
import { SignIn } from "./signIn.page";
import { Navigation } from "./components/navigation";
import { Feed } from "./feed.page";
import { ArticleEditor } from "./articleEditor.page";
import { ArticleDetail } from "./articleDetail.page";

export class AppPageManager {
    
    readonly page: Page
    readonly signIn: SignIn
    readonly navigation: Navigation
    readonly feed: Feed
    readonly articleEditor: ArticleEditor
    readonly articleDetail: ArticleDetail

    constructor(page: Page) {
        this.page = page
        this.signIn = new SignIn(page)
        this.navigation = new Navigation(page)
        this.feed = new Feed(page)
        this.articleEditor = new ArticleEditor(page)
        this.articleDetail = new ArticleDetail(page)
    }
}