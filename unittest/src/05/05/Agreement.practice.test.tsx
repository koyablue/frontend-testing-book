import { render, screen } from "@testing-library/react";
import { Agreement } from "./Agreement";

describe("Agreement component", () => {
  test("fieldsetのアクセシブルネームはlegendを引用している", () => {
    render(<Agreement />);
    expect(
      screen.getByRole("group", { name: "利用規約の同意" })
    ).toBeInTheDocument();
  });
  test("チェックボックスは初期状態でチェックされていない", () => {
    render(<Agreement />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
