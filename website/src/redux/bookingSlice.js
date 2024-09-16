import { createSlice } from "@reduxjs/toolkit";
const cartData = JSON.parse(localStorage.getItem("cart")) || [];

const formattedCart = cartData.map((item) => {
  return {
    serviceId: item.id,
    bookingDetail: {
      specialtyID: item.specialtyID,
      selectedBranchId: "",
      selectedDoctorId: "",
      price: item.price || "",
      selectedWorkScheduleId: "",
      selectedDate: "",
      selectedTime: "",
      clinic: "",
    },
  };
});

const infoBookingSlice = createSlice({
  name: "infoBooking",
  initialState: {
    bookingDetails: formattedCart,
    bookingInfoCheckout: null,
  },
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingDetails = state.bookingDetails.filter(
        (detail) => detail.serviceId != null,
      );

      const existingIndex = state.bookingDetails.findIndex(
        (detail) => detail.serviceId === action.payload.serviceId,
      );

      if (existingIndex >= 0) {
        state.bookingDetails[existingIndex] = action.payload;
      } else {
        state.bookingDetails.push(action.payload);
      }
    },
    removeItemInfo: (state, action) => {
      state.bookingDetails = state.bookingDetails.filter(
        (detail) => detail.serviceId !== action.payload,
      );
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = state.bookingDetails.map((item) => ({
        serviceId: item.serviceId,
        bookingDetail: {
          specialtyID: item.bookingDetail.specialtyID,
          selectedBranchId: "",
          selectedDoctorId: "",
          selectedWorkScheduleId: "",
          selectedDate: "",
          price: item.bookingDetail.price,
          selectedTime: "",
          clinic: "",
        },
      }));
    },
    saveBookingInfo: (state, action) => {
      state.bookingInfoCheckout = action.payload;
    },
  },
});

export const {
  setBookingDetails,
  removeItemInfo,
  clearBookingDetails,
  saveBookingInfo,
} = infoBookingSlice.actions;
export default infoBookingSlice.reducer;
