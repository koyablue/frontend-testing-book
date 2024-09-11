import { getMyArticleLinksByCategory } from ".";
import * as Fetchers from "../fetchers";
import { getMyArticlesData, httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

const mockGetMyArticles = (ok = true) => {
  const spy = jest.spyOn(Fetchers, "getMyArticles");
  return ok
    ? spy.mockResolvedValueOnce(getMyArticlesData)
    : spy.mockRejectedValueOnce(httpError);
};

describe("getMyArticleLinksByCategory", () => {
  describe("データ取得成功", () => {
    test("記事がない場合nullが返される", async () => {
      mockGetMyArticles();
      await expect(getMyArticleLinksByCategory("Python")).resolves.toBe(null);
    });

    test("記事がある場合titleとlinkのオブジェクトを持つ配列が返される", async () => {
      mockGetMyArticles();

      const category = "testing";
      const articles = await getMyArticleLinksByCategory(category);
      const data = getMyArticlesData.articles
        .filter((article) => article.tags.includes(category))
        .map((article) => ({
          title: article.title,
          link: `/articles/${article.id}`,
        }));

      expect(articles).toEqual(data);
    });
  });

  describe("データ取得失敗", () => {
    test("エラーのデータがthrowされる", async () => {
      mockGetMyArticles(false);
      expect.assertions(1);

      try {
        await getMyArticleLinksByCategory("testing");
      } catch (err) {
        expect(err).toBe(httpError);
      }
    });
  });
});
