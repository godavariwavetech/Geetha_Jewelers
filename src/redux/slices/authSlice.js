
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'; 
import { Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; 
export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async ({ phoneNumber }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        customer_mobile_number: phoneNumber,
      };
      const res = await api.post(endpoints.REQUEST_LOGIN_OPT, payload);
      if (res.data) {
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue('No response data');
      }
    } catch (err) {
      console.error('requestOtp error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to send OTP',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const customerLogin = createAsyncThunk(
  'auth/customerLogin',
  async ({ phoneNumber, customerName, customerEmail }, { fulfillWithValue, rejectWithValue }) => {
    try {
      
      const payload = {
        customer_mobile_number: phoneNumber,
        player_id: 'edekjqjwhdjab786', // Updated player_id as per your example
        ...(customerName && { customer_name: customerName }), // Include customer_name if provided
        ...(customerEmail && { customer_email: customerEmail }), // Include customer_email if provided
      };
      
      const res = await api.post(endpoints.VERIFY_LOGIN_OPT, payload);
    console.log(res,"responseeeeeeeeeeeeeeeeeeeeeeeee")
      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('Invalid login response');
      }
    } catch (err) {
      console.error('customerLogin error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to login',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const getUserProfileDetails = createAsyncThunk(
  'auth/getUserProfileDetails',
  async ({ userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        user_id: userId,
      };
      console.log('getUserProfileDetails payload:', payload);
      const res = await api.post(endpoints.USER_PROFILE_DETAILS, payload);
      console.log('getUserProfileDetails response:', res.data);

      if (res.data?.data?.length > 0) {
        return fulfillWithValue(res.data.data[0]);
      } else {
        return rejectWithValue('No profile data');
      }
    } catch (err) {
      console.error('getUserProfileDetails error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch profile',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    { userId, name, email, profileImage },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const payload = {
        user_id: userId,
        customer_name: name || '',
        customer_email: email || '',
        imagesData: profileImage,
        profile_image:profileImage
      };
      console.log('updateUserProfile payload in sliceeeeeeeeeeeeee:', {
        user_id: payload.user_id,
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        profile_image:payload.profile_image
        // profile_image_length: payload.profile_image?.length || 0,
      });

      const res = await api.post(endpoints.UPDATE_PROFILE, payload);
      console.log('updateUserProfile response newwwwwwwwwwwwwwwwwwwwwwwwwwww:', res);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      } else {
        console.warn('Unexpected response status:', res.data?.status);
        return rejectWithValue({
          message: res.data?.message || 'Failed to update profile',
          status: res.status,
          response: res.data,
        });
      }
    } catch (err) {
      console.error('updateUserProfile error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
        rawError: err,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to update profile',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const addCustomerDeliveryAddress = createAsyncThunk(
  'auth/addCustomerDeliveryAddress',
  async (
    { userId, addressType, addressLine, city, state, pincode, customerName, customerPhone, customerEmail },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const payload = {
        user_id: userId,
        address_type: addressType,
        address: addressLine,                    // ← "address" field
        city: city,                               // ← separate "city"
        district: "East Godavari",                // ← you can make this dynamic later if needed
        state: state,                             // ← separate "state"
        pincode: parseInt(pincode),
        customer_name: customerName,
        customer_mobile_number: parseInt(customerPhone), // backend seems to expect number
        ...(customerEmail && { customer_email: customerEmail }), // optional
      };

      console.log('addCustomerDeliveryAddress payload:', payload);

      const res = await api.post(endpoints.ADD_CUSTOMER_DELIVERY_ADDRESS, payload);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue(res.data?.message || 'Failed to add address');
      }
    } catch (err) {
      console.error('addCustomerDeliveryAddress error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to add address',
        status: err.response?.status,
      });
    }
  }
);
export const getCustomerAddresses = createAsyncThunk(
  'auth/getCustomerAddresses',
  async ({ customerId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        user_id: customerId,
      };
      
      const res = await api.post(endpoints.GET_CUSTOMER_DELIVERY_ADDRESS, payload);
      

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('Failed to fetch addresses');
      }
    } catch (err) {
      console.error('getCustomerAddresses error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Error fetching addresses',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const deleteCustomerAddress = createAsyncThunk(
  'auth/deleteCustomerAddress',
  async ({ addressId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        address_id: addressId,
      };
     
      const res = await api.post(endpoints.DELETE_CUSTOMER_DELIVERY_ADDRESS, payload);
     

      if (res.data?.status === 200) {
        return fulfillWithValue(addressId);
      } else {
        return rejectWithValue('Failed to delete address');
      }
    } catch (err) {
      console.error('deleteCustomerAddress error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Error deleting address',
        status: err.response?.status,
        response: err.response?.data,
      });
    }
  }
);
export const requestLocationPermission = createAsyncThunk(
  'auth/requestLocationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      return result;
    } catch (err) {
      console.error('Location permission error:', err);
      return rejectWithValue(err.message || 'Failed to request location permission');
    }
  }
);
// 👈 NEW: Thunk to check current permission status (no prompt)
export const checkLocationPermission = createAsyncThunk(
  'auth/checkLocationPermission',
  async (_, { rejectWithValue }) => {
    try {
      const status = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      return status;
    } catch (err) {
      console.error('Check location permission error:', err);
      return rejectWithValue(err.message || 'Failed to check location permission');
    }
  }
);
// 👈 NEW: Thunk to get current location (with permission check/request if needed)
export const getCurrentLocation = createAsyncThunk(
  'auth/getCurrentLocation',
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      // First, check current permission status
      let permissionStatus = await dispatch(checkLocationPermission()).unwrap();

      if (permissionStatus !== RESULTS.GRANTED) {
        // Request permission if not granted
        permissionStatus = await dispatch(requestLocationPermission()).unwrap();

        if (permissionStatus !== RESULTS.GRANTED) {
          Alert.alert(
            'Location Permission Required',
            'This app needs location access to provide better services. Please enable it in settings.',
            [{ text: 'OK' }]
          );
          return rejectWithValue('Location permission denied');
        }
      }
      // Get current location
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            console.log('Stored lat/long on app open/update:', location); // 👈 Log the stored lat/longs
            resolve(fulfillWithValue(location));
          },
          (error) => {
            console.error('Geolocation error:', error);
            reject(error.message || 'Failed to get current location');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } catch (err) {
      console.error('getCurrentLocation error:', err);
      return rejectWithValue(err.message || 'Failed to get current location');
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'auth/deleteUserAccount',
  async ({ userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        user_id: userId,
      };
      
      console.log('deleteUserAccount payload:', payload);
      
      // using endpoints.DELETE_USER_ACCOUNT (make sure to add this to your config file)
      // or hardcode "deleteuseraccount" if you haven't updated config yet
      const res = await api.post(endpoints.DELETE_USER_ACCOUNT, payload); 
      
      console.log('deleteUserAccount response:', res.data);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue('Failed to delete account');
      }
    } catch (err) {
      console.error('deleteUserAccount error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Error deleting account',
        status: err.response?.status,
      });
    }
  }
);

// export const postPlayerId = createAsyncThunk(
//   'auth/postPlayerId',
//   async ({ userId, playerId }, { rejectWithValue }) => {

//     try {
//       const payload = {
//         user_id: userId,
//         player_id: playerId,
//       };
//       console.log(payload,"to send tokennnnnnnnnnnnnnnnnn")
//       // Uses the endpoint from your config
//       const res = await api.post(endpoints.POST_PLAYER_ID, payload); 
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err?.response?.data?.message || 'Failed to sync token');
//     }
//   }
// );
export const postPlayerId = createAsyncThunk(
  'auth/postPlayerId',
  async ({ userId, playerId }, { rejectWithValue }) => {
    console.log('🔍 Thunk STARTED with args:', { userId, playerId }); // ← New: Confirm thunk entry

    try {
      const payload = {
        user_id: userId,
        player_id: playerId,
      };
      console.log(payload, "to send tokennnnnnnnnnnnnnnnnn"); // ← Your existing log (already firing)

      console.log('📡 About to call API with endpoint:', endpoints.POST_PLAYER_ID); // ← New: Log endpoint for verification

      // Uses the endpoint from your config
      const res = await api.post(endpoints.POST_PLAYER_ID, payload);
      
      console.log('✅ API SUCCESS - Response:', res.data); // ← New: Log full response on success
      return res.data;
    } catch (err) {
      console.error('❌ API ERROR - Full error object:', err); // ← New: Log entire error for details
      console.error('❌ API ERROR - Response data (if any):', err?.response?.data); // ← New: Break down error structure
      console.error('❌ API ERROR - Status (if any):', err?.response?.status); // ← New: HTTP status code

      const errorMessage = err?.response?.data?.message || err.message || 'Failed to sync token (unknown error)';
      console.log('💥 Rejecting with message:', errorMessage); // ← New: Log the exact rejection value

      return rejectWithValue(errorMessage);
    } finally {
      console.log('🏁 Thunk ENDED (success or failure)'); // ← New: Always logs end of thunk
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    customerOtp: null,
    customerMobile: null,
    customerId: null,
    loading: false,
    error: null,
    customerName:null,
    customerProfile: null,
    profileUpdateStatus: 'idle',
    deliveryAddressStatus: 'idle',
    deliveryAddressError: null,
    addressList: [],
    addressListStatus: 'idle',
    addressListError: null,
    locationPermissionStatus: null, 
    locationPermissionLoading: false, 
    locationPermissionError: null, 
    location: null, // Stores { latitude, longitude, latitudeDelta, longitudeDelta }
    locationName: 'Current Location', // Default name
    locationId: null, // Optional unique ID for the location
    currentLocationStatus: 'idle', // 👈 NEW: Status for getCurrentLocation
    currentLocationError: null, // 👈 NEW: Error for getCurrentLocation

    deleteAccountStatus: 'idle', // 👈 New state
    deleteAccountError: null,

     playerId: null,
  },
  reducers: {
    logout(state) {
      state.customerId = null;
      state.customerOtp = null;
      state.customerMobile = null;
      state.customerName = null;
      state.customerProfile = null;
      state.error = null;
      state.addressList = [];
      state.locationPermissionStatus = null; // 👈 Reset location permission on logout
      state.locationPermissionError = null;
      state.location = null;
      state.locationName = 'Current Location';
      state.locationId = null;
      state.currentLocationStatus = 'idle';
      state.currentLocationError = null;
    },
    setLocation(state, action) {
      state.location = action.payload;
      // 👈 Log the stored lat/longs whenever set (e.g., on app open or manual update)
      if (action.payload) {
        console.log('Stored lat/long updated:', action.payload);
      }
    },
    setLocationName(state, action) {
      state.locationName = action.payload;
    },
    setLocationId(state, action) {
      state.locationId = action.payload;
    },
    setPlayerId: (state, action) => { // 👈 Added this
      state.playerId = action.payload;
      console.log('PlayerId set in Redux:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(customerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.customerId = action.payload.customer_id;
        state.customerMobile = action.payload.customer_mobile_number;
        state.customerOtp = action.payload.customer_otp;
        state.customerName = action.payload.customer_name
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUserProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.customerProfile = action.payload;
      })
      .addCase(getUserProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.profileUpdateStatus = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.profileUpdateStatus = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileUpdateStatus = 'failed';
        state.error = action.payload.message;
      })
      .addCase(addCustomerDeliveryAddress.pending, (state) => {
        state.deliveryAddressStatus = 'loading';
        state.deliveryAddressError = null;
      })
      .addCase(addCustomerDeliveryAddress.fulfilled, (state, action) => {
        state.deliveryAddressStatus = 'succeeded';
        state.addressList = [...state.addressList, action.payload];
      })
      .addCase(addCustomerDeliveryAddress.rejected, (state, action) => {
        state.deliveryAddressStatus = 'failed';
        state.deliveryAddressError = action.payload.message;
      })
      .addCase(getCustomerAddresses.pending, (state) => {
        state.addressListStatus = 'loading';
        state.addressListError = null;
      })
      .addCase(getCustomerAddresses.fulfilled, (state, action) => {
        state.addressListStatus = 'succeeded';
        state.addressList = action.payload;
      })
      .addCase(getCustomerAddresses.rejected, (state, action) => {
        state.addressListStatus = 'failed';
        state.addressListError = action.payload.message;
      })
      .addCase(deleteCustomerAddress.pending, (state) => {
        state.deliveryAddressStatus = 'loading';
        state.deliveryAddressError = null;
      })
      .addCase(deleteCustomerAddress.fulfilled, (state, action) => {
        state.deliveryAddressStatus = 'succeeded';
        state.addressList = state.addressList.filter(
          (addr) => addr.address_id !== action.payload
        );
      })
      .addCase(deleteCustomerAddress.rejected, (state, action) => {
        state.deliveryAddressStatus = 'failed';
        state.deliveryAddressError = action.payload.message;
      })
      .addCase(requestLocationPermission.pending, (state) => {
        state.locationPermissionLoading = true;
        state.locationPermissionError = null;
      })
      .addCase(requestLocationPermission.fulfilled, (state, action) => {
        state.locationPermissionLoading = false;
        state.locationPermissionStatus = action.payload;
      })
      .addCase(requestLocationPermission.rejected, (state, action) => {
        state.locationPermissionLoading = false;
        state.locationPermissionError = action.payload;
        state.locationPermissionStatus = RESULTS.DENIED;
      })
      // 👈 NEW: Cases for checkLocationPermission
      .addCase(checkLocationPermission.pending, (state) => {
        state.locationPermissionLoading = true;
        state.locationPermissionError = null;
      })
      .addCase(checkLocationPermission.fulfilled, (state, action) => {
        state.locationPermissionLoading = false;
        state.locationPermissionStatus = action.payload;
      })
      .addCase(checkLocationPermission.rejected, (state, action) => {
        state.locationPermissionLoading = false;
        state.locationPermissionError = action.payload;
        state.locationPermissionStatus = RESULTS.DENIED;
      })
      // 👈 NEW: Cases for getCurrentLocation
      .addCase(getCurrentLocation.pending, (state) => {
        state.currentLocationStatus = 'loading';
        state.currentLocationError = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.currentLocationStatus = 'succeeded';
        // Dispatch the reducer to set location and log
        state.location = action.payload;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.currentLocationStatus = 'failed';
        state.currentLocationError = action.payload;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteAccountStatus = 'loading';
        state.deleteAccountError = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.deleteAccountStatus = 'succeeded';
        // Reset user data effectively logging them out
        state.customerId = null;
        state.customerOtp = null;
        state.customerMobile = null;
        state.customerName = null;
        state.customerProfile = null;
        state.addressList = [];
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.deleteAccountStatus = 'failed';
        state.deleteAccountError = action.payload?.message || 'Failed to delete account';
      })
        .addCase(postPlayerId.fulfilled, (state, action) => {
        // You can also update state here once the API confirms success
        state.loading = false;
      });
  },
});

export const { logout ,setLocation,setLocationName,setLocationId,setPlayerId} = authSlice.actions;
export default authSlice.reducer;