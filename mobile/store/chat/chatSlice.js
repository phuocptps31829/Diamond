import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectFirstTime: true,
    messages: []
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        setConnectFirstTime: (state, action) => {
            state.connectFirstTime = action.payload;
        }
    }
});

export const { setMessages, setConnectFirstTime } = chatSlice.actions;

export default chatSlice.reducer;