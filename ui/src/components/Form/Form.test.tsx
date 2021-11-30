import { render, screen, fireEvent, waitFor } from "/@jest-utils";
import Form, { IProps } from "/#/Form/component";

interface IFormFields {
  test: string;
}

describe("Form Component", () => {
  const mockOnSubmit = jest.fn();

  let props: Omit<IProps<IFormFields>, "children">;

  beforeEach(() => {
    props = {
      onSubmit: mockOnSubmit
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

  const userSubmitsForm = () => {
    fireEvent.input(screen.getByRole("textbox", { name: "Test" }), { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button"));
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

    userSubmitsForm();

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalledWith({ test: "abc" }, expect.any(Object));
    });
  });

  test("should use parent form methods if provided", async () => {
    const mockHandleSubmit = jest.fn(e => e.preventDefault());
    const mockRegister = jest.fn((name: string) => ({ name }));

    props = {
      ...props,
      methods: {
        register: mockRegister,
        handleSubmit: () => mockHandleSubmit
      } as any // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    exec();

    expect(mockRegister).toHaveBeenCalled();

    userSubmitsForm();

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
