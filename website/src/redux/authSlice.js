import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: Cookies.get("accessToken") || null,
    userProfile: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutAction: (state) => {
      state.accessToken = null;
      state.userProfile = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const {
  setAccessToken,
  setUserProfile,
  removeAccessToken,
  logoutAction,
} = authSlice.actions;
export default authSlice.reducer;
