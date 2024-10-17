import { createSlice } from "@reduxjs/toolkit";

const cartData = JSON.parse(localStorage.getItem("cart")) || [];
console.log('cartInit', cartData);
const formattedCart = cartData.map((item) => {
  return {
    ...(item.serviceID
      ? { serviceID: item.serviceID }
      : { medicalPackageID: item.medicalPackageID }),
    bookingDetail: {
      specialtyID: item.specialtyID,
      price: 0,
      selectedBranchID: "",
      selectedDoctorID: "",
      selectedWorkScheduleID: "",
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
      const existingIndex = state.bookingDetails.findIndex(
        (detail) => detail.serviceID
          ? detail.serviceID === action.payload.serviceID
          : detail.medicalPackageID === action.payload.medicalPackageID,
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
        (detail) => detail?.serviceID
          ? detail?.serviceID !== null
          : detail?.medicalPackageID !== null,
      );

      const existingIndex = state.bookingDetails.findIndex(
        (detail) => detail?.serviceID
          ? detail?.serviceID === action.payload.serviceID
          : detail?.medicalPackageID === action.payload.medicalPackageID,
      );

      if (existingIndex >= 0) {
        state.bookingDetails[existingIndex] = action.payload;
      } else {
        state.bookingDetails.push(action.payload);
      }
    },
    removeItemInfo: (state, action) => {
      const isService = action.payload.isService;
      state.bookingDetails = state.bookingDetails.filter((detail) =>
        isService
          ? detail.serviceID !== action.payload._id
          : detail.medicalPackageID !== action.payload._id
      );
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = state.bookingDetails.map((item) => ({
        serviceId: item.serviceId,
        bookingDetail: {
          specialtyID: item.bookingDetail.specialtyID,
          selectedBranchID: "",
          selectedDoctorID: "",
          selectedWorkScheduleID: "",
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

export const {
  changeBookingDetails,
  removeItemInfo,
  clearBookingDetails,
  saveBookingInfo,
  initBookingDetails
} = infoBookingSlice.actions;
export default infoBookingSlice.reducer;
