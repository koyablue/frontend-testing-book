import { timeout, wait } from ".";

describe("非同期処理のテスト", () => {
  test("resolve", async () => {
    expect(await wait(50)).toBe(50);
  });

  test("reject", async () => {
    expect.assertions(1);

    try {
      await timeout(50);
    } catch (err) {
      expect(err).toBe(50);
    }
  });
});
