import { add, sub } from ".";

describe("制限のある四則演算", () => {
  test("1 + 1 = 2", () => {
    expect(add(1, 1)).toBe(2);
  });
  test("上限は100", () => {
    expect(add(50, 51)).toBe(100);
  });
  test("2 - 1 = 1", () => {
    expect(sub(2, 1)).toBe(1);
  });
  test("下限は0", () => {
    expect(sub(1, 2)).toBe(0);
  });
});
