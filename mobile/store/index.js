import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/chatSlice';
import profileSlice from './profile/profileSlice';
import branchesSlice from './branches/branchesSlice';
import bookingSlice from './booking/bookingSlice';

export const store = configureStore({
    reducer: {
        chat: chatSlice,
        profile: profileSlice,
        branches: branchesSlice,
        booking: bookingSlice
    },
});