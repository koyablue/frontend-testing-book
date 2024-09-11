import { greet, sayGoodBye } from "./greet";

jest.mock("./greet.ts", () => ({
  ...jest.requireActual("./greet"),
  sayGoodBye: (name: string) => `Goodbye ${name}`,
}));

describe("挨拶", () => {
  test("greetはHello! 名前.を返す", () => {
    expect(greet("Taro")).toBe("Hello! Taro.");
  });

  test("sayGoodByeはGoodbye 名前を返す", () => {
    expect(sayGoodBye("Taro")).toBe("Goodbye Taro");
  });
});
