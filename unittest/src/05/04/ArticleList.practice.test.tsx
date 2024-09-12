import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

describe("ArticleList", () => {
  test("itemsがあるときリストが表示される", () => {
    render(<ArticleList items={items} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(within(list).getAllByRole("listitem")).toHaveLength(items.length);
  });

  test("itemsが空のときリストは表示されず「投稿記事がありません」が表示される", () => {
    render(<ArticleList items={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
  });
});
