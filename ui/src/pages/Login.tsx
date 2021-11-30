import { useForm, SubmitHandler } from "react-hook-form";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "/@/redux/reducers/auth";
import Form, { Input } from "/#/Form";
import { ILoginInFields } from "/@/types/loginIn";
import PropTypes, { InferProps } from "prop-types";
import signIn from "/@/api/gymby/v1/auth/signIn";

const propTypes = {
  setAuthToken: PropTypes.oneOf([setAuthToken]).isRequired
};

export const Login = ({ setAuthToken }: InferProps<typeof propTypes>): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const defaultValues: ILoginInFields = { username: "", password: "" };
  const formMethods = useForm<ILoginInFields>({
    defaultValues
  });

  const handleSubmit: SubmitHandler<ILoginInFields> = async data => {
    try {
      const responseData = await signIn(data);

      setAuthToken(responseData.token);

      navigate(from, { replace: true });
    } catch (e) {
      formMethods.reset(defaultValues);
    }
  };

  return (
    <div>
      <Form<ILoginInFields> onSubmit={handleSubmit} submitText="Login" methods={formMethods}>
        {({ register }) => (
          <>
            <Input {...register("username")} type="text" label="Username" />
            <Input {...register("password")} type="password" label="Password" />
          </>
        )}
      </Form>
    </div>
  );
};

Login.prototype = propTypes;

export default connect(undefined, { setAuthToken })(Login);
