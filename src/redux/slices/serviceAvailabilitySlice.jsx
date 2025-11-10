// src/redux/slices/serviceAvailabilitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

// Haversine formula to calculate distance between two points (in kilometers nine
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Thunk to fetch service availability and calculate delivery time
export const fetchServiceAvailability = createAsyncThunk(
  'serviceAvailability/fetchServiceAvailability',
  async ({ customerLatitude, customerLongitude }, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.GET_SERVICE_AVAILABILITY);
      const warehouseData = response.data.data[0]; // Assuming single warehouse for simplicity

      if (!warehouseData) {
        return rejectWithValue('No warehouse data available');
      }

      const {
        id: warehouse_id,
        warehouse_latitude,
        warehouse_longitude,
        minimum_delivery_service_km,
        minimum_delivery_time,
        maximum_delivery_service_km,
        maximum_delivery_time,
      } = warehouseData;

      // Calculate distance between customer and warehouse
      const distance = haversineDistance(
        parseFloat(customerLatitude),
        parseFloat(customerLongitude),
        parseFloat(warehouse_latitude),
        parseFloat(warehouse_longitude)
      );

      // Determine expected delivery time based on distance
      let expected_time;
      if (distance <= minimum_delivery_service_km) {
        expected_time = minimum_delivery_time; // e.g., "1 hr 30 min"
      } else if (distance <= maximum_delivery_service_km) {
        expected_time = maximum_delivery_time; // e.g., "1 day"
      } else {
        return rejectWithValue('Delivery not available for this location');
      }

      return {
        warehouse_id,
        expected_time,
        distance,
        warehouseData,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service availability');
    }
  }
);

const serviceAvailabilitySlice = createSlice({
  name: 'serviceAvailability',
  initialState: {
    warehouse_id: null,
    expected_time: null,
    distance: null,
    warehouseData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouse_id = action.payload.warehouse_id;
        state.expected_time = action.payload.expected_time;
        state.distance = action.payload.distance;
        state.warehouseData = action.payload.warehouseData;
      })
      .addCase(fetchServiceAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceAvailabilitySlice.reducer;