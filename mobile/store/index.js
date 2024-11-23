import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/chatSlice';
import profileSlice from './profile/profileSlice';
import branchesSlice from './branches/branchesSlice';

export const store = configureStore({
    reducer: {
        chat: chatSlice,
        profile: profileSlice,
        branches: branchesSlice,
    },
});