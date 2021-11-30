import { forwardRef, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { UseFormRegisterReturn } from "react-hook-form";
import PropTypes from "prop-types";

type TProps = {
  type: string;
  label: string;
} & Omit<UseFormRegisterReturn, "ref">;

const Input = forwardRef<HTMLInputElement, TProps>(({ label, ...props }, ref) => {
  const uid = useMemo(() => uuid(), []);

  return (
    <>
      <label htmlFor={uid}>{label}</label>
      <input ref={ref} id={uid} {...props} />
    </>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default Input;
