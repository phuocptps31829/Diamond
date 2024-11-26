import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {}
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = {};
            console.log("clearProfile", state.profile);
        },
    }
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;