import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: {}
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addItemToBook: (state, action) => {
            state.item = action.payload;
        },
    }
});

export const { addItemToBook } = bookingSlice.actions;

export default bookingSlice.reducer;