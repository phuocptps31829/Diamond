import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemSlice from "./cartSlice";
import bookingReducer from "./bookingSlice";
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true, latency: 0, features: { persist: false } });

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: itemSlice,
    infoBooking: bookingReducer,
  },
});
