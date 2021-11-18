import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { NAME as authSliceName } from "/@/reducers/auth";
import PropTypes from "prop-types";

export const Auth = ({ user }) => {
  // ToDo: Auth hook
  const auth = { user };
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

Auth.propTypes = {
  user: PropTypes.bool.isRequired
};

export default connect(state => ({ user: state[authSliceName].auth }))(Auth);
