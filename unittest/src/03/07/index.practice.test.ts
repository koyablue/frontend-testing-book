import { timeout, wait } from ".";

describe("Promise test", () => {
  test("waitがdurationの値でresolveされる", async () => {
    await expect(wait(50)).resolves.toBe(50);
  });

  test("timeoutがdurationの値でrejectされる", async () => {
    expect.assertions(1);
    try {
      await timeout(50);
    } catch (err) {
      expect(err).toBe(50);
    }
  });
});
