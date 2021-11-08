import { render, screen } from "/@jest-utils";
import App from "./App";

describe("App", function () {
  beforeEach(() => {
    render(<App />);
  });

  test("should render Learn React link", async () => {
    expect(screen.getByRole("link", { name: "Learn React" })).toBeDefined();
  });

  test("should render an Unauthorised link, based on the redux state", () => {
    expect(screen.getByRole("link", { name: "Unauthorised" })).toBeDefined();
  });
});
