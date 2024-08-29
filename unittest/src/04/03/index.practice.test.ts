import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

describe("getGreet", () => {
  test("ユーザー名がある場合", async () => {
    const name = "Taro";
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "abc123",
      name,
      email: "example@example.com",
    });
    expect(getGreet()).resolves.toBe(`Hello, ${name}!`);
  });
  test("ユーザー名がない場合", () => {
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "abc123",
      email: "example@example.com",
    });

    expect(getGreet()).resolves.toBe("Hello, anonymous user!");
  });

  test("失敗時エラーに相当するデータがthrowされる", async () => {
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch (err) {
      expect(err).toMatchObject(httpError);
    }
  });
});
