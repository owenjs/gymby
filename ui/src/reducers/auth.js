import { createSlice } from "@reduxjs/toolkit";

export const NAME = "auth";

const initialState = { auth: false };

const counterSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setAuth(state, { payload }) {
      state.auth = payload;
    }
  }
});

export const { setAuth } = counterSlice.actions;
export default counterSlice.reducer;
