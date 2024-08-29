import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

describe("ArticleList component", () => {
  test("itemがあるとき記事一覽が表示される", () => {
    render(<ArticleList items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(
      within(screen.getByRole("list")).getAllByRole("listitem")
    ).toHaveLength(items.length);
  });
  test("itemがないとき記事一覽が表示されない", () => {
    render(<ArticleList items={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
  });
});
