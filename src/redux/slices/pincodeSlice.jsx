import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

export const fetchPincodes = createAsyncThunk(
  'pincode/fetchPincodes',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_PINCODES);
    
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue(res.data?.message || 'No pincodes found');
      }
    } catch (err) {
      console.error('fetchPincodes error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch pincodes',
        status: err.response?.status,
      });
    }
  }
);

const pincodeSlice = createSlice({
  name: 'pincode',
  initialState: {
    pincodes: [],
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
      .addCase(fetchPincodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPincodes.fulfilled, (state, action) => {
        state.loading = false;
        state.pincodes = action.payload;
      })
      .addCase(fetchPincodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = pincodeSlice.actions;
export default pincodeSlice.reducer;