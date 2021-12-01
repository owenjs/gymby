import { render, screen } from "/@jest-utils";
import { NAME as authSliceName } from "/@/redux/reducers/auth";
import Pages from "/@/pages";

jest.mock(
  "/@/pages/Login",
  () =>
    function mockLogin() {
      return <div data-testid="login">Login Mock</div>;
    }
);

describe("Dashboard Page", () => {
  let renderOptions = {},
    container: HTMLElement;

  const exec = () => {
    const { container: renderedContainer } = render(<Pages />, renderOptions);

    container = renderedContainer;
  };

  test("should render Login page when user is not logged in", () => {
    renderOptions = { route: "/dashboard" };

    exec();

    expect(screen.getByTestId("login")).toBeDefined();
  });

  test("should render correctly when user is logged in", () => {
    renderOptions = { route: "/dashboard", preloadedState: { [authSliceName]: { authToken: "abc" } } };

    exec();

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="c-main-wrapper"
        >
          <div>
            Dashboard
          </div>
        </div>
      </div>
    `);
  });
});
