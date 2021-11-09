import { render } from "/@jest-utils";
import { Auth } from "/@/pages/Auth";
import { Navigate, Outlet } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
  Outlet: jest.fn()
}));

describe("Auth Page", () => {
  beforeEach(() => {
    Navigate.mockReturnValue(null);
    Outlet.mockReturnValue(null);
  });

  test("should redirect user when not logged in", () => {
    render(<Auth user={false} />);

    expect(Navigate).toHaveBeenCalled();
    expect(Outlet).not.toHaveBeenCalled();
  });

  test("should render child routes when user is logged in", () => {
    render(<Auth user={true} />);

    expect(Outlet).toHaveBeenCalled();
    expect(Navigate).not.toHaveBeenCalled();
  });
});
