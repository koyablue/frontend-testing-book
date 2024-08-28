import { add, sub } from ".";

describe("四則演算", () => {
  test("1 + 2 = 3", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("3 - 2 = 1", () => {
    expect(sub(3, 2)).toBe(1);
  });
});
