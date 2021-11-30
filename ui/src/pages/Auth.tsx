import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { NAME as authSliceName } from "/@/redux/reducers/auth";
import PropTypes, { InferProps } from "prop-types";
import { RootState } from "/@/redux/reducers";

const propTypes = {
  authToken: PropTypes.string.isRequired
};

export const Auth = ({ authToken }: InferProps<typeof propTypes>): JSX.Element => {
  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

Auth.propTypes = propTypes;

export default connect((state: RootState) => ({ authToken: state[authSliceName].authToken }))(Auth);
