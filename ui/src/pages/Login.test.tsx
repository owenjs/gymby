import { render, screen, fireEvent, waitFor } from "/@jest-utils";
import { Login } from "/@/pages/Login";
import actualSignIn from "/@/api/gymby/v1/auth/signIn";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

jest.mock("/@/api/gymby/v1/auth/signIn");

const signIn = actualSignIn as jest.Mock;

describe("Dashboard Page", () => {
  const mockedSetAuthToken = jest.fn();

  const renderOptions = {},
    apiReturn = { token: "abc" };

  beforeEach(() => {
    mockedSetAuthToken.mockReset();
    signIn.mockReset();

    signIn.mockImplementation(() => Promise.resolve(apiReturn));
  });

  const exec = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<Login setAuthToken={mockedSetAuthToken as any} />, renderOptions);
  };

  const getLoginButton = () => screen.getByRole("button", { name: "Login" });

  const userLogsIn = () => {
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "abc" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "abc" } });

    fireEvent.click(getLoginButton());
  };

  test("should render login button", () => {
    exec();

    expect(getLoginButton()).toBeDefined();
  });

  test("should fire the setAuthToken event when user logs in correctly", async () => {
    exec();

    userLogsIn();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
      expect(mockedSetAuthToken).toHaveBeenCalled();
      expect(mockedSetAuthToken).toHaveBeenCalledWith(apiReturn.token);
    });
  });

  test("should fire a 'navigate' call when user logs in correctly", async () => {
    exec();

    userLogsIn();

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });
});
