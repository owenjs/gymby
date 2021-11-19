import { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "/@/reducers/auth";
import PropTypes, { InferProps } from "prop-types";

const propTypes = {
  setAuth: PropTypes.oneOf([setAuth]).isRequired
};

export const Login = ({ setAuth }: InferProps<typeof propTypes>): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit: MouseEventHandler = e => {
    e.preventDefault();

    // ToDo: auth endpoint
    setAuth(true);

    navigate(from, { replace: true });
  };

  return (
    <div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

Login.prototype = propTypes;

export default connect(undefined, { setAuth })(Login);
