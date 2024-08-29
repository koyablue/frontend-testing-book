import { render, screen } from "@testing-library/react";
import { ArticleListItem } from "./ArticleListItem";
import { items } from "./fixture";

describe("ArticleListItem", () => {
  test("IDに紐づいたリンクが表示される", () => {
    const item = items[0];
    render(<ArticleListItem {...item} />);
    expect(screen.getByRole("link", { name: "もっと見る" })).toHaveAttribute(
      "href",
      `/articles/${item.id}`
    );
  });
});
