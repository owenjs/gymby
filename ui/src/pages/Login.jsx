import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "/@/reducers/auth";
import PropTypes from "prop-types";

export const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = e => {
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

Login.propTypes = {
  setAuth: PropTypes.func.isRequired
};

export default connect(undefined, { setAuth })(Login);
