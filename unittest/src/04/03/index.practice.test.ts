import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers/");

describe("getGreet", () => {
  test("データ取得成功", async () => {
    const data = {
      id: "abc",
      name: "Taro",
      age: 20,
      email: "example@example.com",
    };
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce(data);

    await expect(getGreet()).resolves.toBe(`Hello, ${data.name}!`);
  });

  test("データ取得成功し、データのnameがない", async () => {
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "abc",
      email: "example@example.com",
    });

    await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
  });

  test("データ取得失敗", async () => {
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);

    expect.assertions(1);
    try {
      await getGreet();
    } catch (err) {
      expect(err).toBe(httpError);
    }
  });
});
