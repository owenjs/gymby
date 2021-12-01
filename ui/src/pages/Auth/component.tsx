import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes, { InferProps } from "prop-types";

const propTypes = {
  authToken: PropTypes.string.isRequired
};

const Auth = ({ authToken }: InferProps<typeof propTypes>): JSX.Element => {
  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

Auth.propTypes = propTypes;

export default Auth;
