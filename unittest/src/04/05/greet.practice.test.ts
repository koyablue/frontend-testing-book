import { greet } from "./greet";

describe("greetのコールバックtest", () => {
  const callback = jest.fn();
  test("コールバックがあるときコールバックが呼ばれる", () => {
    greet("taro", callback);
    expect(callback).toHaveBeenCalledWith(`Hello! taro`);
  });

  test("コールバックがないときコールバックが呼ばれない", () => {
    greet("taro");
    expect(callback).not.toHaveBeenCalled();
  });
});
