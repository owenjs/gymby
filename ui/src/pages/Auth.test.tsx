import { render } from "/@jest-utils";
import { Auth } from "/@/pages/Auth";
import { Navigate as actualNavigate, Outlet as actualOutlet } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
  Outlet: jest.fn()
}));

const Navigate = actualNavigate as jest.Mock;
const Outlet = actualOutlet as jest.Mock;

describe("Auth Page", () => {
  beforeEach(() => {
    Navigate.mockReturnValue(null);
    Outlet.mockReturnValue(null);
  });

  test("should redirect user when not logged in", () => {
    render(<Auth authToken="" />);

    expect(Navigate).toHaveBeenCalled();
    expect(Outlet).not.toHaveBeenCalled();
  });

  test("should render child routes when user is logged in", () => {
    render(<Auth authToken="abc" />);

    expect(Outlet).toHaveBeenCalled();
    expect(Navigate).not.toHaveBeenCalled();
  });
});
