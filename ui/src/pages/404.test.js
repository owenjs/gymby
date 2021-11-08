import { render, screen } from "/@jest-utils";
import Pages from "/@/pages";

describe("404 Page", () => {
  test("should render 404 when URL does not match a route", () => {
    render(<Pages />, { route: "/will-not-match" });

    expect(screen.getByTestId("404")).toBeDefined();
  });
});
