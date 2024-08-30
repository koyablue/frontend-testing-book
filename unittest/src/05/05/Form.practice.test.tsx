import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const user = userEvent.setup();

describe("Form component", () => {
  test("利用規約がチェックされていない場合サインアップボタンは非活性", () => {
    render(<Form />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(
      screen.getByRole("button", { name: "サインアップ" })
    ).not.toBeEnabled();
  });
  test("利用規約がチェックされている場合サインアップボタンは活性", async () => {
    render(<Form />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByRole("button", { name: "サインアップ" })).toBeEnabled();
  });
  test("formのアクセシブルロールはh2を引用している", () => {
    render(<Form />);
    expect(
      screen.getByRole("form", { name: "新規アカウント登録" })
    ).toBeInTheDocument();
  });
});
