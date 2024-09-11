import { add, RangeError, sub } from ".";

describe("add, sub", () => {
  describe("add", () => {
    describe("引数が0-100の間のとき", () => {
      test("合計が100以下のとき合計値が返される", () => {
        expect(add(1, 99)).toBe(100);
      });
      test("合計が100より大きいとき100が返される", () => {
        expect(add(1, 100)).toBe(100);
      });
    });

    describe("バリデーションテスト", () => {
      describe("引数が0より小さいもしくは100より大きいときRangeErrorがthrowされる", () => {
        test("add", () => {
          expect(() => add(-1, 1)).toThrow(RangeError);
        });

        test("add", () => {
          expect(() => add(1, 101)).toThrow(RangeError);
        });
      });
    });
  });

  describe("sub", () => {
    describe("引数が0-100の間のとき", () => {
      test("差が0より大きいとき差が返される", () => {
        expect(sub(100, 99)).toBe(1);
      });
      test("差が0より小さいとき0が返される", () => {
        expect(sub(1, 2)).toBe(0);
      });
    });

    describe("バリデーションテスト", () => {
      describe("引数が0より小さいもしくは100より大きいときRangeErrorがthrowされる", () => {
        test("sub", () => {
          expect(() => sub(-1, 1)).toThrow(RangeError);
          expect(() => sub(1, 101)).toThrow(RangeError);
        });
      });
    });
  });
});
