import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    status: "idle",
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        remove(state, action) {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        increaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        decreaseQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        }
    }
});

export const { add, remove, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
