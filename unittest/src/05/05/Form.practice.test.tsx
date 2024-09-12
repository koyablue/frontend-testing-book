import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const user = userEvent.setup();

beforeEach(() => {
  render(<Form />);
});

describe("Form", () => {
  test("アカウント情報が入力できる", async () => {
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    await user.type(emailInput, "example@example.com");
    expect(emailInput).toHaveDisplayValue("example@example.com");

    const passwordInput = screen.getByPlaceholderText("8文字以上で入力");
    await user.type(passwordInput, "passw0rD");
    expect(passwordInput).toHaveDisplayValue("passw0rD");
  });

  test("チェックボックスをチェックしていないときボタンが非活性", async () => {
    const checkbox = screen.getByRole("checkbox", {
      name: "当サービスの 利用規約 を確認し、これに同意します",
    });
    const button = screen.getByRole("button", { name: "サインアップ" });
    expect(checkbox).not.toBeChecked();
    expect(button).not.toBeEnabled();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });
});
