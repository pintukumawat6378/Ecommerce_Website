import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for fetching, creating, updating, and deleting orders
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const response = await axios.get('http://localhost:3000/orders/getAllOrders');
    return response.data;
});

export const createOrder = createAsyncThunk('order/createOrder', async (order) => {
    const response = await axios.post('http://localhost:3000/orders/createOrder', order);
    return response.data;
});

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ id, updatedOrder }) => {
    const response = await axios.put(`http://localhost:3000/orders/updateOrder/${id}`, updatedOrder);
    return response.data;
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id) => {
    await axios.delete(`http://localhost:3000/orders/deleteOrder/${id}`);
    return id;
});

const ordersSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        status: 'idle',
        isSuccess: false,
        error: null,
    },
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload);
                state.isSuccess = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                state.orders[index] = action.payload;
                state.isSuccess = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order._id !== action.payload);
                state.isSuccess = true;
            });
    },
});

export const { resetSuccess } = ordersSlice.actions;

export default ordersSlice.reducer;
