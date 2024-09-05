// redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersByUserId = createAsyncThunk(
  'orders/fetchOrdersByUserId',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/orders/getOrderByUserId/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/orders/getAllOrders`);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
//   export const createOrder = createAsyncThunk('order/createOrder', async (order) => {
//     const response = await axios.post('http://localhost:3000/orders/createOrder', order);
//     return response.data;
// });
  
  export const deleteOrderById = createAsyncThunk(
    'orders/deleteOrderById',
    async (orderId, thunkAPI) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URI}/orders/deleteOrder/${orderId}`);
        return orderId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  export const updateOrderStatus = createAsyncThunk(
    "orders/updateStatus",
    async ({ orderId, status }, thunkAPI) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URI}/orders/updateStatus/${orderId},
          { status }`
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
    //   .addCase(createOrder.fulfilled, (state, action) => {
    //     state.orders.push(action.payload); // Add the new order to the state
    // })
    // .addCase(createOrder.rejected, (state, action) => {
    //     state.error = action.error.message; // Handle errors
    // })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOrderById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(order => order._id !== action.payload);
      })
      .addCase(deleteOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
