import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthTokenHeader } from "/@/api/gymby/v1/axios";

export const NAME = "auth";

const initialState = { authToken: "" };

const counterSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setAuthToken(state, { payload }: PayloadAction<string>) {
      setAuthTokenHeader(payload);

      state.authToken = payload;
    }
  }
});

export const { setAuthToken } = counterSlice.actions;
export default counterSlice.reducer;
