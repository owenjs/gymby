import { render, screen, fireEvent } from "/@jest-utils";
import { Login } from "/@/pages/Login";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

describe("Dashboard Page", () => {
  const mockedSetAuth = jest.fn();

  const renderOptions = {};

  beforeEach(() => {
    mockedSetAuth.mockReset();
  });

  const exec = () => {
    render(<Login setAuth={mockedSetAuth as any} />, renderOptions);
  };

  const getLoginButton = () => screen.getByRole("button", { name: "Login" });

  test("should render login button", () => {
    exec();

    expect(getLoginButton()).toBeDefined();
  });

  test("should fire the setAuth event when user logs in correctly", () => {
    exec();

    fireEvent.click(getLoginButton());

    expect(mockedSetAuth).toHaveBeenCalled();
    expect(mockedSetAuth).toHaveBeenCalledWith(true);
  });

  test("should fire a 'navigate' call when user logs in correctly", () => {
    exec();

    fireEvent.click(getLoginButton());

    expect(mockedNavigate).toHaveBeenCalled();
  });
});
