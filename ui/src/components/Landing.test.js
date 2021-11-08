import { render, screen } from "/@jest-utils";
import Landing from "/#/Landing";

describe("Landing", function () {
  beforeEach(() => {
    render(<Landing />);
  });

  test("should render Learn React link", () => {
    expect(screen.getByRole("link", { name: "Learn React" })).toBeDefined();
  });

  test("should render an Unauthorised link, based on the redux state", () => {
    expect(screen.getByRole("link", { name: "Unauthorised" })).toBeDefined();
  });
});
