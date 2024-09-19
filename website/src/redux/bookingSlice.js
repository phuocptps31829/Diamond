import { createSlice } from "@reduxjs/toolkit";

const cartData = JSON.parse(localStorage.getItem("cart")) || [];
console.log('cartInit', cartData);
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

const initialState = {
  bookingDetails: formattedCart,
  bookingInfoCheckout: null,
};

console.log(initialState);

const infoBookingSlice = createSlice({
  name: "infoBooking",
  initialState,
  reducers: {
    changeBookingDetails: (state, action) => {
      // state.bookingDetails = state.bookingDetails.filter(
      //   (detail) => detail.serviceId != null,
      // );
      console.log(action.payload);
      const existingIndex = state.bookingDetails.findIndex(
        (detail) => detail.serviceId === action.payload.serviceId,
      );

      if (existingIndex >= 0) {
        state.bookingDetails[existingIndex] = {
          ...state.bookingDetails[existingIndex],
          bookingDetail: {
            ...state.bookingDetails[existingIndex].bookingDetail,
            ...action.payload.newChange
          }
        };
      }
    },
    initBookingDetails: (state, action) => {
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
        (detail) => detail.serviceId !== action.payload
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
    setCurIdSelected: (state, action) => {
      state.curIdSelected = action.payload;
    }
  },
});

export const { changeBookingDetails, removeItemInfo, clearBookingDetails, saveBookingInfo, initBookingDetails } = infoBookingSlice.actions;
export default infoBookingSlice.reducer;