
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';
// Async thunk for placing an order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(orderData,"order payload ")
      const res = await api.post(endpoints.ORDER_PLACED, orderData);
      console.log('placeOrder response++++++++++++++++++:', res.data);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue('Invalid order response');
      }
    } catch (err) {
      console.error('placeOrder error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to place order',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
// Async thunk for fetching user orders
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (customerId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_USER_ORDERS, { customer_id: customerId });
      console.log('fetchUserOrders response:', res.data);

      if (res.data?.status === 200 && Array.isArray(res.data.data)) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('Invalid orders response or no orders found');
      }
    } catch (err) {
      console.error('fetchUserOrders error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch user orders',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const updatePaymentDetails = createAsyncThunk(
  'order/updatePaymentDetails',
  async (paymentPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.UPDATE_PAYMENT_DETAILS, paymentPayload);
      console.log('updatePaymentDetails response:', res.data);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue('Invalid payment update response');
      }
    } catch (err) {
      console.error('updatePaymentDetails error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to update payment details',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);

// Async thunk for fetching order details
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (orderId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_ORDER_DETAILS, { order_id: orderId });
      console.log('getOrderDetails response:', res.data);

      if (res.data?.status === 200 && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return fulfillWithValue(res.data.data[0]);
      } else {
        return rejectWithValue('Invalid order details response or no order found');
      }
    } catch (err) {
      console.error('getOrderDetails error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch order details',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);


const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    orders: [],
    orderDetails: null,
    paymentUpdateStatus: null, // Add new state for payment update
    loading: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orders = [];
      state.orderDetails = null;
      state.paymentUpdateStatus = null; // Reset payment update status
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // placeOrder cases
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchUserOrders cases
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getOrderDetails cases
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updatePaymentDetails cases
      .addCase(updatePaymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUpdateStatus = action.payload;
        state.error = null;
      })
      .addCase(updatePaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;