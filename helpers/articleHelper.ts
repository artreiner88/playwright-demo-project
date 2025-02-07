import { faker } from "@faker-js/faker";

export class ArticleHelper {

    static getArticle() {
        return {
            title: faker.word.words(5),
            description: faker.word.words(5),
            text: faker.word.words(50),
            tags: [
                faker.word.noun(), faker.word.noun(), faker.word.noun()
            ]
        }
    }
}