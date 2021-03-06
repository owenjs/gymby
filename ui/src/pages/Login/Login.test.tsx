import { render, screen, fireEvent, waitFor } from "/@jest-utils";
import Login from "/@/pages/Login/component";
import actualSignIn from "/@/api/gymby/v1/auth/signIn";
import { Navigate as actualNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn()
}));

jest.mock("/@/api/gymby/v1/auth/signIn");

const signIn = actualSignIn as jest.Mock;
const Navigate = actualNavigate as jest.Mock;

describe("Dashboard Page", () => {
  const mockedSetAuthToken = jest.fn();

  const renderOptions = {},
    apiReturn = { token: "abc" };

  let willAPIResolve = true,
    authToken = "";

  beforeEach(() => {
    Navigate.mockReturnValue(null);
    mockedSetAuthToken.mockReset();
    signIn.mockReset();
    willAPIResolve = true;
    authToken = "";

    signIn.mockImplementation(() => (willAPIResolve ? Promise.resolve(apiReturn) : Promise.reject(new Error())));
  });

  const exec = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<Login authToken={authToken} setAuthToken={mockedSetAuthToken as any} />, renderOptions);
  };

  const getLoginButton = () => screen.getByRole("button", { name: "Login" });

  const userLogsIn = () => {
    fireEvent.input(screen.getByLabelText("Username"), { target: { value: "abc" } });
    fireEvent.input(screen.getByLabelText("Password"), { target: { value: "abc" } });

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
      expect(signIn).toHaveBeenCalledWith({ username: "abc", password: "abc" });

      expect(mockedSetAuthToken).toHaveBeenCalled();
      expect(mockedSetAuthToken).toHaveBeenCalledWith(apiReturn.token);
    });
  });

  test("should redirect user when logged in", async () => {
    authToken = "abc";

    exec();

    await waitFor(() => {
      expect(Navigate).toHaveBeenCalled();
    });
  });

  test("should reset the form if the user logs in incorrectly", async () => {
    willAPIResolve = false;

    exec();

    userLogsIn();

    await waitFor(() => {
      expect(screen.getByLabelText<HTMLInputElement>("Username").value).toBe("");
      expect(screen.getByLabelText<HTMLInputElement>("Password").value).toBe("");
    });
  });
});
