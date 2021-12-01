import { connect } from "react-redux";
import AuthPageComponent from "/@/pages/Auth/component";
import { NAME as authSliceName } from "/@/redux/reducers/auth";
import { RootState } from "/@/redux/reducers";

export default connect((state: RootState) => ({ authToken: state[authSliceName].authToken }))(AuthPageComponent);
