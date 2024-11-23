import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    branches: []
};

const branchesSlice = createSlice({
    name: "branches",
    initialState,
    reducers: {
        setBranches: (state, action) => {
            state.branches = action.payload;
        },
    }
});

export const { setBranches } = branchesSlice.actions;

export default branchesSlice.reducer;