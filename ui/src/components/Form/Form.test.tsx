import { render, screen, fireEvent, waitFor } from "/@jest-utils";
import Form, { IProps } from "/#/Form/component";

interface IFormFields {
  test: string;
}

describe("Form Component", () => {
  const mockedOnSubmit = jest.fn();

  let props: Omit<IProps<IFormFields>, "children">;

  beforeEach(() => {
    props = {
      onSubmit: mockedOnSubmit
    };
  });

  const exec = () => {
    render(
      <Form<IFormFields> {...props}>
        {({ register }) => (
          <>
            <label htmlFor="test">Test</label>
            <input {...register("test")} id="test" type="text" />
          </>
        )}
      </Form>
    );
  };

  test("should render submit button", () => {
    exec();

    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should render submit button with custom text", () => {
    props = {
      ...props,
      submitText: "Test"
    };

    exec();

    expect(screen.getByRole("button", { name: "Test" })).toBeDefined();
  });

  test("should render child input", () => {
    exec();

    expect(screen.getByRole("textbox", { name: "Test" })).toBeDefined();
  });

  test("should call onSubmit when form is submitted", async () => {
    exec();

    fireEvent.change(screen.getByRole("textbox", { name: "Test" }), { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockedOnSubmit).toHaveBeenCalled();
      expect(mockedOnSubmit).toHaveBeenCalledWith({ test: "abc" }, expect.any(Object));
    });
  });
});
