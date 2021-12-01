import { connect } from "react-redux";
import { RootState } from "/@/redux/reducers";
import { setAuthToken, NAME as authSliceName } from "/@/redux/reducers/auth";

import LoginPageComponent from "/@/pages/Login/component";

export default connect((state: RootState) => ({ authToken: state[authSliceName].authToken }), { setAuthToken })(
  LoginPageComponent
);
