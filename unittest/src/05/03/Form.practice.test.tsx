import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const user = userEvent.setup();

const name = "taro";
const onSubmit = jest.fn();

describe("Form component", () => {
  beforeEach(() => render(<Form name={name} onSubmit={onSubmit} />));

  test("nameが表示される", () => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test("編集ボタンが表示される", () => {
    expect(
      screen.getByRole("button", { name: "編集する" })
    ).toBeInTheDocument();
  });

  test("編集ボタンを押すとonSubmitが実行される", async () => {
    const button = screen.getByRole("button", { name: "編集する" });
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
