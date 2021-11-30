import { useForm, UseFormReturn, SubmitHandler, UseFormProps } from "react-hook-form";
import PropTypes from "prop-types";
import { ReactNode } from "react";

export interface IProps<TFormValues> extends UseFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  methods?: UseFormReturn<TFormValues>;
  submitText?: string;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
}

const Form = <TFormValues extends object>({
  onSubmit,
  submitText,
  defaultValues,
  methods: parentMethods,
  children
}: IProps<TFormValues>): JSX.Element => {
  const methods =
    parentMethods ||
    useForm<TFormValues>({
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
  defaultValues: PropTypes.object,
  methods: PropTypes.object
};

Form.defaultProps = {
  defaultValues: {},
  methods: null,
  submitText: "Submit"
};

export default Form;
