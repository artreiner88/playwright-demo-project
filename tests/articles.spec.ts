import { ArticleService } from "../services/articleService";
import { expect, test } from "../fixtures/pages";
import { ArticleHelper } from "../helpers/articleHelper";

test.beforeEach( async ({ pages }) => {
    await pages.page.goto(process.env.URL)
    await pages.signIn.signIn(process.env.EMAIL, process.env.PASSWORD)
})

test("Create article", async ({ pages, request }) => {
    const { navigation, articleEditor, articleDetail } = pages
    const article = ArticleHelper.getArticle()

    // CREATE /UI/
    await navigation.navigateToCreateArticle()
    await articleEditor.setTitle(article.title)
    await articleEditor.setDescription(article.description)
    await articleEditor.setText(article.text)
    await articleEditor.setTags(article.tags)
    await articleEditor.clickPublishBtn()

    const articleResponse = await articleDetail.page.waitForResponse(`${process.env.API_URL}/articles/`)
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug

    await expect(articleDetail.page.getByText(article.title)).toBeVisible()

    // DELETE /API/
    const deleteArticleResponse = await request.delete(`${process.env.API_URL}/articles/${slugId}`)
    expect(deleteArticleResponse.status()).toEqual(204)
})

test("Delete article", async ({ pages, request }) => {
    
    const article = ArticleHelper.getArticle()
    const { feed, articleDetail } = pages
    const articleService = new ArticleService(request)

    // CREATE /API/
    const response = await articleService.createArticle(article)
    expect(response.status()).toEqual(201)

    // DELETE /UI/
    await feed.page.getByText(article.title).click()
    await expect(articleDetail.page.getByText(article.title)).toBeVisible()
    await articleDetail.deleteButton.click()
    await expect(feed.page.getByText(article.title)).not.toBeVisible()
})

test("Edit article", async ({ pages, request }) => {
    const initialArticle = ArticleHelper.getArticle()
    const newArticle = ArticleHelper.getArticle()
    const { feed, articleDetail, articleEditor } = pages
    const articleService = new ArticleService(request)

    // CREATE /API/
    const postArticleResponse = await articleService.createArticle(initialArticle)
    expect(postArticleResponse.status()).toEqual(201)

    const postArticleResponseBody = await postArticleResponse.json()
    const postSlugId = postArticleResponseBody.article.slug

    // EDIT /UI/
    await feed.page.getByText(initialArticle.title).click()
    await articleDetail.clickEditBtn()
    await expect(articleEditor.titleField).toHaveValue(initialArticle.title)

    await articleEditor.setTitle(newArticle.title)
    await articleEditor.setDescription(newArticle.description)
    await articleEditor.setText(newArticle.text)
    await articleEditor.deleteTags(initialArticle.tags)
    await articleEditor.setTags(newArticle.tags)
    await articleEditor.clickPublishBtn()

    const putArticleResponse = await articleDetail.page.waitForResponse(`${process.env.API_URL}/articles/${postSlugId}`)
    const putArticleResponseBody = await putArticleResponse.json()
    const putSlugId = putArticleResponseBody.article.slug

    await expect(articleDetail.page.getByText(newArticle.title)).toBeVisible()
    await expect(articleDetail.page.getByText(newArticle.text)).toBeVisible()
    for (const tag of newArticle.tags) {
          await expect(articleDetail.page.getByText(tag)).toBeVisible()
      }

    // DELETE /API/
    const deleteResponse = await articleService.deleteArticle(putSlugId)
    expect(deleteResponse.status()).toEqual(204)
})
