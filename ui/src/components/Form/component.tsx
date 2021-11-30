import { useForm, UseFormReturn, SubmitHandler, UseFormProps } from "react-hook-form";
import PropTypes from "prop-types";
import { ReactNode } from "react";

export interface IProps<TFormValues> extends UseFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  submitText?: string;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
}

const Form = <TFormValues extends object>({
  onSubmit,
  submitText,
  defaultValues,
  children
}: IProps<TFormValues>): JSX.Element => {
  const methods = useForm<TFormValues>({
    defaultValues
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
      <button>{submitText}</button>
    </form>
  );
};

Form.prototype = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  defaultValues: PropTypes.object
};

Form.defaultProps = {
  defaultValues: {},
  submitText: "Submit"
};

export default Form;
