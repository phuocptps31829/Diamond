import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/chatSlice';

export const store = configureStore({
    reducer: {
        chat: chatSlice
    },
});