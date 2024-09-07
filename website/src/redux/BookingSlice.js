import { createSlice } from "@reduxjs/toolkit";

const infoBookingSlice = createSlice({
  name: "infoBooking",
  initialState: {
    bookingDetails: [],
  },
  reducers: {
    setBookingDetails: (state, action) => {
      // Filter out any null objects from the bookingDetails array
      state.bookingDetails = state.bookingDetails.filter(detail => detail.serviceId !== null);

      const existingIndex = state.bookingDetails.findIndex(
        (detail) => detail.serviceId === action.payload.serviceId
      );
      if (existingIndex >= 0) {
        state.bookingDetails[existingIndex] = action.payload;
      } else {
        state.bookingDetails.push(action.payload);
      }
      console.log("Updated bookingDetails:", state.bookingDetails); 
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = [];
    },
  },
});

export const { setBookingDetails, clearBookingDetails } = infoBookingSlice.actions;
export default infoBookingSlice.reducer;