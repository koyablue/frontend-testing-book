import { getMyArticleLinksByCategory } from ".";
import * as Fetchers from "../fetchers";
import { getMyArticlesData, httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

describe("getMyArticleLinksByCategory", () => {
  test("指定したタグを持つ記事が1件もない場合nullが返る", async () => {
    jest
      .spyOn(Fetchers, "getMyArticles")
      .mockResolvedValueOnce(getMyArticlesData);

    const res = await getMyArticleLinksByCategory("python");
    expect(res).toBeNull();
  });

  test("指定したタグを持つ記事が1件以上ある場合リンク一覽が返る", async () => {
    jest
      .spyOn(Fetchers, "getMyArticles")
      .mockResolvedValueOnce(getMyArticlesData);

    const res = await getMyArticleLinksByCategory("testing");
    expect(res).toMatchObject([
      {
        title: "TypeScript を使ったテストの書き方",
        link: "/articles/howto-testing-with-typescript",
      },
      {
        title: "Jest ではじめる React のコンポーネントテスト",
        link: "/articles/react-component-testing-with-jest",
      },
    ]);
  });

  test("データ取得に失敗した場合例外がthrowされる", async () => {
    jest.spyOn(Fetchers, "getMyArticles").mockRejectedValueOnce(httpError);

    expect.assertions(1);
    try {
      await getMyArticleLinksByCategory("testing");
    } catch (err) {
      expect(err).toBe(httpError);
    }
  });
});
