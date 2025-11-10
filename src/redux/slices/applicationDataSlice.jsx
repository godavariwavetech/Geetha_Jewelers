// applicationDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

export const fetchApplicationData = createAsyncThunk(
  'applicationData/fetchApplicationData',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_APPLICATION_DATA);
   
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue(res.data?.message || 'No application data found');
      }
    } catch (err) {
      console.error('fetchApplicationData error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch application data',
        status: err.response?.status,
      });
    }
  }
);

const applicationDataSlice = createSlice({
  name: 'applicationData',
  initialState: {
    applicationData: null,
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
      .addCase(fetchApplicationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationData.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationData = action.payload[0]; // Store the first object from the data array
      })
      .addCase(fetchApplicationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = applicationDataSlice.actions;
export default applicationDataSlice.reducer;