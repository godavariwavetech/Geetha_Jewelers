import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

export const fetchCoupons = createAsyncThunk(
  'coupon/fetchCoupons',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_COUPONS);
      console.log('fetchCoupons response:', res.data);
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue(res.data?.message || 'No coupons found');
      }
    } catch (err) {
      console.error('fetchCoupons error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch coupons',
        status: err.response?.status,
      });
    }
  }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = couponSlice.actions;
export default couponSlice.reducer;