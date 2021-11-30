import { render, screen } from "/@jest-utils";
import Form, { IProps } from "/#/Form/component";
import Input from "/#/Form/Input/component";
import uuid from "uuid";

jest.mock("uuid", () => ({
  ...jest.requireActual("uuid")
}));

interface IFormFields {
  test: string;
}

describe("Form Input", () => {
  const props: Omit<IProps<IFormFields>, "children"> = {
    onSubmit: data => console.log(data)
  };

  const exec = () => {
    render(
      <Form<IFormFields> {...props}>{({ register }) => <Input {...register("test")} type="text" label="Test" />}</Form>
    );
  };

  test("should render input with matching label", () => {
    exec();

    expect(screen.getByRole("textbox", { name: "Test" })).toBeDefined();
  });

  test("should generate a unique id for the input", () => {
    const uuidSpy = jest.spyOn(uuid, "v4");

    exec();

    expect(uuidSpy).toHaveBeenCalled();

    uuidSpy.mockRestore();
  });
});
