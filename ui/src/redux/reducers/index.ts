import auth, { NAME as authSliceName } from "/@/redux/reducers/auth";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [authSliceName]: auth
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
