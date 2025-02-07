import { APIRequestContext } from "@playwright/test";
import { Article } from "../types/types";

export class ArticleService {

    private request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async createArticle(article: Article) {
        const response = await this.request.post(`${process.env.API_URL}/articles/`, {
            data: {
                "article": {
                    "title": article.title,
                    "description": article.description,
                    "body": article.text,
                    "tagList": article.tags
                }
            }
        })
        return response
    }

    async deleteArticle(slugId: string) {
        const response = await this.request.delete(`${process.env.API_URL}/articles/${slugId}`)
        return response
    }
}
