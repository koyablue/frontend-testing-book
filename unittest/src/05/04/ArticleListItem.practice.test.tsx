import { render, screen } from "@testing-library/react";
import { ArticleListItem } from "./ArticleListItem";
import { items } from "./fixture";

describe("ArticleListItem", () => {
  test("title, body, リンクが表示される", () => {
    const item = items[0];
    render(<ArticleListItem {...item} />);
    expect(screen.getByRole("heading")).toHaveTextContent(item.title);
    expect(screen.getByText(item.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "もっと見る" })).toHaveAttribute(
      "href",
      `/articles/${item.id}`
    );
  });
});
