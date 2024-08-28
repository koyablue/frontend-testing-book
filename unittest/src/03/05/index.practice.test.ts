import { add, RangeError } from ".";

describe("入力値が0~100の範囲外のとき例外がthrowされる", () => {
  test("add", () => {
    expect(() => add(-1, 1)).toThrow(RangeError);
  });
});
