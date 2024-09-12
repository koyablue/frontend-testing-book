import { greetByTime } from ".";

const setUp = () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
};

describe("greetByTime", () => {
  setUp();
  test("現在時刻が12時より前のとき「おはよう」", () => {
    jest.setSystemTime(new Date("2023-01-01T11:59:59"));
    expect(greetByTime()).toBe("おはよう");
  });
  test("現在時刻が12時以降かつ18時より前のとき「こんにちは」", () => {
    jest.setSystemTime(new Date("2023-01-01T12:00:00"));
    expect(greetByTime()).toBe("こんにちは");
  });
  test("現在時刻が18時以降のとき「こんばんは」", () => {
    jest.setSystemTime(new Date("2023-01-01T18:01:00"));
    expect(greetByTime()).toBe("こんばんは");
  });
});
