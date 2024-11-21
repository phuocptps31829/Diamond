import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const isService = action.payload.isService;
      state.cart = state.cart.filter(item =>
        isService
          ? item.serviceID !== action.payload._id
          : item.medicalPackageID !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCartItems: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCartItems,
} = itemSlice.actions;
export default itemSlice.reducer;