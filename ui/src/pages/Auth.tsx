import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { NAME as authSliceName } from "/@/reducers/auth";
import PropTypes, { InferProps } from "prop-types";
import { RootState } from "/@/reducers";

const propTypes = {
  user: PropTypes.bool.isRequired
};

export const Auth = ({ user }: InferProps<typeof propTypes>): JSX.Element => {
  // ToDo: Auth hook
  const auth = { user };
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

Auth.propTypes = propTypes;

export default connect((state: RootState) => ({ user: state[authSliceName].auth }))(Auth);
