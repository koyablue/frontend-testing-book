import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from ".";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Nav", () => {
  test.each([
    { route: "/my/posts", name: "My Posts" },
    { route: "/my/posts/create", name: "Create Post" },
  ])("$routeでは$nameがcurrentになっている", ({ route, name }) => {
    mockRouter.push(route);
    render(<Nav onCloseMenu={() => {}} />);
    expect(screen.getByRole("link", { name })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
