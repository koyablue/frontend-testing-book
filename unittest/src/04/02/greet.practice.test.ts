import { greet, sayGoodBye } from "./greet";

jest.mock("./greet.ts", () => ({
  ...jest.requireActual("./greet"),
  sayGoodBye: (name: string) => `Goodbye ${name}`,
}));

describe("挨拶を返す", () => {
  test("Hello! 名前.", () => {
    expect(greet("John")).toBe("Hello! John.");
  });
  test("Goodbye 名前", () => {
    expect(sayGoodBye("John")).toBe("Goodbye John");
  });
});
