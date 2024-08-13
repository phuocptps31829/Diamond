import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
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
  },
});

export const { setAccessToken, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
