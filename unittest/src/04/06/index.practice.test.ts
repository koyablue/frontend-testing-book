import { checkLength } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";
import { ArticleInput } from "../fetchers/type";

jest.mock("../fetchers");

const mockPostMyArticle = (input: ArticleInput, status = 200) => {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }

  try {
    checkLength(input.title);
    checkLength(input.body);
    return jest.spyOn(Fetchers, "postMyArticle").mockResolvedValueOnce({
      id: "abc123",
      createdAt: new Date().toISOString(),
      ...input,
    });
  } catch (err) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }
};

const inputFactory = (input?: Partial<ArticleInput>) => ({
  tags: ["testing"],
  title: "TypeScript を使ったテストの書き方",
  body: "テストを書く時、TypeScript を使うことで、テストの保守性が向上します…",
  ...input,
});

describe("postMyArticle", () => {
  test("バリデーション成功時 作成した記事データが返される", async () => {
    const input = inputFactory();
    const mock = mockPostMyArticle(input);
    const res = await Fetchers.postMyArticle(input);
    expect(res).toMatchObject(expect.objectContaining(input));
    expect(mock).toHaveBeenCalled();
  });
  test("バリデーション失敗時 エラーがthrowされる", async () => {
    expect.assertions(2);
    const input = inputFactory({ title: "", body: "" });
    const mock = mockPostMyArticle(input);

    try {
      await Fetchers.postMyArticle(input);
    } catch (err) {
      expect(err).toBe(httpError);
      expect(mock).toHaveBeenCalled();
    }
  });
  test("通信失敗時 エラーがthrowされる", async () => {
    expect.assertions(2);
    const input = inputFactory();
    const mock = mockPostMyArticle(input, 500);
    try {
      await Fetchers.postMyArticle(input);
    } catch (err) {
      expect(err).toBe(httpError);
      expect(mock).toHaveBeenCalled();
    }
  });
});
