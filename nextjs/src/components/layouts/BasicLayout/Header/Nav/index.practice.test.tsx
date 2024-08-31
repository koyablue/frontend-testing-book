import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from ".";

describe("Nav", () => {
  test.each([
    { link: "/my/posts", name: "My Posts" },
    { link: "/my/posts/create", name: "Create Post" },
  ])("URLが$linkのとき$nameがcurrentになっている", (params) => {
    mockRouter.setCurrentUrl(params.link);
    render(<Nav onCloseMenu={() => {}} />);
    expect(screen.getByRole("link", { name: params.name })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
