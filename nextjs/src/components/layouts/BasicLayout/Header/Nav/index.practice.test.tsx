import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from ".";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Nav", () => {
  test("URLとアクティブなリンクが合致している", () => {
    mockRouter.push("/my/posts");
    render(<Nav onCloseMenu={() => {}} />);
    expect(screen.getByRole("link", { name: "My Posts" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
