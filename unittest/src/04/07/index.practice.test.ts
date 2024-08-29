import { greetByTime } from ".";

describe("greetByTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("時刻が12時より前のとき「おはよう」を返す", () => {
    jest.setSystemTime(new Date("2024-08-31T11:59:00"));
    expect(greetByTime()).toBe("おはよう");
  });
  test("時刻が12時以降で18時以前のとき「こんにちは」を返す", () => {
    jest.setSystemTime(new Date("2024-08-31T17:59:00"));
    expect(greetByTime()).toBe("こんにちは");
  });
  test("18時以降のとき「こんばんは」を返す", () => {
    jest.setSystemTime(new Date("2024-08-31T23:59:00"));
    expect(greetByTime()).toBe("こんばんは");
  });
});
