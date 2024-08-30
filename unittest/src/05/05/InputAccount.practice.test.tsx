import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputAccount } from "./InputAccount";

const user = userEvent.setup();

describe("InputAccount component", () => {
  test("メールアドレスの入力が可能", async () => {
    render(<InputAccount />);
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const email = "example.example.com";
    await user.type(emailInput, email);
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
  });
  test("パスワードの入力が可能", async () => {
    render(<InputAccount />);
    const passwordInput = screen.getByPlaceholderText("8文字以上で入力");
    const pass = "abc12345";
    await user.type(passwordInput, pass);
    expect(screen.getByDisplayValue(pass)).toBeInTheDocument();
  });
});
