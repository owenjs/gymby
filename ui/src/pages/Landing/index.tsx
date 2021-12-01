import LandingPageComponent from "/@/pages/Landing/component";
import { connect } from "react-redux";
import { NAME as authSliceName } from "/@/redux/reducers/auth";
import { RootState } from "/@/redux/reducers";

export default connect((state: RootState) => ({ authToken: state[authSliceName].authToken }))(LandingPageComponent);
