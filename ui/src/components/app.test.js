import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", function () {
  test("should render Learn React link", async () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Learn React" })).toBeDefined();
  });
});
