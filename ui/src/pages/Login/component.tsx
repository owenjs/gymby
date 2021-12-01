import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes, { InferProps } from "prop-types";
import { setAuthToken } from "/@/redux/reducers/auth";
import Form, { Input } from "/#/Form";
import { ILoginInFields } from "/@/types/loginIn";
import signIn from "/@/api/gymby/v1/auth/signIn";

const propTypes = {
  authToken: PropTypes.string.isRequired,
  setAuthToken: PropTypes.oneOf([setAuthToken]).isRequired
};

const Login = ({ authToken, setAuthToken }: InferProps<typeof propTypes>): JSX.Element => {
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
    } catch (e) {
      formMethods.reset(defaultValues);
    }
  };

  return authToken ? (
    <Navigate to={from} replace={true} />
  ) : (
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

export default Login;
