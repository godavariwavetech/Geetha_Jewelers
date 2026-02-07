// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { endpoints } from '../../config/config'; // Adjust path as needed
// import api from '../../utils/api'; // Adjust path as needed

// // --- Existing Thunk: Add Scheme Details ---
// export const addSchemeHolderDetails = createAsyncThunk(
//   'scheme/addSchemeHolderDetails',
//   async ({ userId, name, address, phoneNumber, documentProof }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = {
//         user_id: userId,
//         name: name,
//         address: address,
//         phone_number: phoneNumber,
//         document_proof: documentProof,
//       };
//       console.log('Sending Scheme Registration Payload:', payload);
//       const res = await api.post(endpoints.ADD_SCHEME_HOLDER_DETAILS, payload);
//       console.log('Scheme Registration Response:', res.data);

//       if (res.data?.status === 200) {
//         return fulfillWithValue(res.data);
//       } else {
//         return rejectWithValue(res.data?.message || 'Failed to register details');
//       }
//     } catch (err) {
//       console.error('addSchemeHolderDetails error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message || 'Network Error');
//     }
//   }
// );

// // --- NEW Thunk: Fetch Metal Rates ---
// export const fetchDailyMetalRates = createAsyncThunk(
//   'scheme/fetchDailyMetalRates',
//   async (_, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       // console.log('Fetching Metal Rates...');
//       const res = await api.get(endpoints.GET_DAILY_METAL_RATES);
//       // console.log('Metal Rates Response:', res.data);

//       if (res.data?.status === 200 && res.data?.data?.length > 0) {
//         // Return the first object from the data array
//         return fulfillWithValue(res.data.data[0]);
//       } else {
//         return rejectWithValue(res.data?.message || 'Failed to fetch rates');
//       }
//     } catch (err) {
//       console.error('fetchDailyMetalRates error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message || 'Network Error');
//     }
//   }
// );


// export const checkSchemeHolder = createAsyncThunk(
//   'scheme/checkSchemeHolder',
//   async (userId, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = { user_id: userId };
//       const res = await api.post(endpoints.CHECK_SCHEME_HOLDER, payload);

//       if (res.data?.status === 200) {
//         const holderData = res.data.data?.[0] || null;
//         return fulfillWithValue({
//           isEligible: holderData ? [1, 2].includes(holderData.profile_status) : false,
//           holder: holderData, // full object {id, name, profile_status, ...}
//         });
//       }
//       return fulfillWithValue({ isEligible: false, holder: null });
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to check scheme status');
//     }
//   }
// );
// export const generateOrderId = createAsyncThunk(
//   'scheme/generateOrderId',
//   async (amount, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = { payment_amount: amount };
//       console.log('Generating Order ID payload:++++++++++++++', payload);
      
//       const res = await api.post(endpoints.GENERATE_ORDER_ID, payload);
//       console.log('Order ID Response++++++++++++++++++++++:', res.data);

//       if (res.data?.orderId) {
//         return fulfillWithValue(res.data);
//       } else {
//         return rejectWithValue('Failed to generate Order ID');
//       }
//     } catch (err) {
//       console.error('generateOrderId error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // --- NEW Thunk: Fetch Scheme Banners ---
// export const fetchSchemeBanners = createAsyncThunk(
//   'scheme/fetchSchemeBanners',
//   async (_, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       // Use GET for fetching data
//       const res = await api.get(endpoints.GET_SCHEME_BANNERS);
      
//       if (res.data?.status === 200 && Array.isArray(res.data.data)) {
//         return fulfillWithValue(res.data.data);
//       } else {
//         return rejectWithValue('Failed to fetch banners');
//       }
//     } catch (err) {
//       console.error('fetchSchemeBanners error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // --- NEW Thunk: Update Scheme Details (After Payment) ---
// export const updateSchemeDetails = createAsyncThunk(
//   'scheme/updateSchemeDetails',
//   async (payload, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       console.log('Updating Scheme Details Payload:', payload);
//       const res = await api.post(endpoints.UPDATE_SCHEME_DETAILS, payload);
//       console.log('Update Scheme Response:', res.data);

//       if (res.data?.status === 200) {
//         return fulfillWithValue(res.data);
//       } else {
//         return rejectWithValue(res.data?.message || 'Failed to update scheme details');
//       }
//     } catch (err) {
//       console.error('updateSchemeDetails error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const fetchUserSchemes = createAsyncThunk(
//   'scheme/fetchUserSchemes',
//   async (userId, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = { user_id: userId }; // adjust if your API expects different format
//       const res = await api.post(endpoints.GET_USER_SCHEMES, payload);

//       if (res.data?.status === 200) {
//         return fulfillWithValue(res.data.data || []);
//       } else {
//         return rejectWithValue(res.data?.message || 'Failed to fetch schemes');
//       }
//     } catch (err) {
//       console.error('fetchUserSchemes error:', err);
//       return rejectWithValue(err.response?.data?.message || 'Network Error');
//     }
//   }
// );

// // --- NEW Thunk: Fetch Single Scheme Details ---
// export const fetchSchemeDetails = createAsyncThunk(
//   'scheme/fetchSchemeDetails',
//   async (id, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = { id: id };
//       console.log('Fetching Scheme Details Payload:', payload);
      
//       const res = await api.post(endpoints.GET_SCHEME_DETAILS, payload);
//       console.log('Scheme Details Response:', res.data);

//       if (res.data?.status === 200 && res.data?.data?.length > 0) {
//         return fulfillWithValue(res.data.data[0]); // Return the first object
//       } else {
//         return rejectWithValue('Failed to fetch scheme details');
//       }
//     } catch (err) {
//       console.error('fetchSchemeDetails error:', err);
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
// export const paySchemeInstallment = createAsyncThunk(
//   'scheme/paySchemeInstallment',
//   async ({ schemeId, installmentAmount, paymentId }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const payload = {
//         id: Number(schemeId),               // scheme id
//         installment_amount: Number(installmentAmount),
//         payment_id: paymentId.trim(),       // razorpay_payment_id
//       };

//       console.log('📤 Paying scheme installment - payload:', payload);

//       const response = await api.post(endpoints.PAY_SCHEME_INSTALLMENT, payload);

//       console.log('📥 Pay installment response:', response.data);

//       if (response.data?.status === 200) {
//         // You can return more meaningful data if backend sends it
//         return fulfillWithValue({
//           success: true,
//           message: response.data.message || 'Installment recorded successfully',
//           // payment_record_id: response.data?.data?.insertId, // if useful
//         });
//       }

//       return rejectWithValue(response.data?.message || 'Failed to record installment payment');
//     } catch (error) {
//       console.error('❌ paySchemeInstallment failed:', error);
//       return rejectWithValue(
//         error.response?.data?.message ||
//         error.message ||
//         'Network error while recording installment'
//       );
//     }
//   }
// );
// const schemeSlice = createSlice({
//   name: 'scheme',
//   initialState: {
//     loading: false,
//     error: null,
//     isRegistered: false,
//      // Check status loading
//   checkLoading: false,
//   checkError: null,
//     // New State for Rates
//     metalRates: null, 
//     metalRatesLoading: false,
//     metalRatesError: null,
//     orderData: null,
//     paymentLoading: false,
//     paymentError: null,
//     // Banners State
//     schemeBanners: [], 
//     bannersLoading: false,
//     // Update Scheme
//     updateSchemeLoading: false,
//     updateSchemeError: null,
//     updateSchemeSuccess: null,

//       userSchemes: [],                    // ← new
//     schemesLoading: false,              // ← new
//     schemesError: null,

//     // --- NEW: Scheme Details State ---
//     schemeDetails: null,
//     detailsLoading: false,
//     detailsError: null,
//        // New fields for installment payment
//     installmentPaymentLoading: false,
//     installmentPaymentSuccess: null,
//     installmentPaymentError: null,
//     lastPaymentRecord: null, 
//   },
//   reducers: {
//     resetSchemeStatus: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.isRegistered = false;
//       state.orderData = null;
//       state.paymentError = null;
//       state.updateSchemeSuccess = null;
//       state.schemeDetails = null; 
//     },
//      clearInstallmentPaymentStatus: (state) => {
//       state.installmentPaymentSuccess = null;
//       state.installmentPaymentError = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Registration Cases
//       .addCase(addSchemeHolderDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addSchemeHolderDetails.fulfilled, (state) => {
//         state.loading = false;
//         state.isRegistered = true;
//       })
//       .addCase(addSchemeHolderDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // NEW: Metal Rates Cases
//       .addCase(fetchDailyMetalRates.pending, (state) => {
//         state.metalRatesLoading = true;
//         state.metalRatesError = null;
//       })
//       .addCase(fetchDailyMetalRates.fulfilled, (state, action) => {
//         state.metalRatesLoading = false;
//         state.metalRates = action.payload;
//       })
//       .addCase(fetchDailyMetalRates.rejected, (state, action) => {
//         state.metalRatesLoading = false;
//         state.metalRatesError = action.payload;
//       })
//       // Check Scheme Holder Cases
// .addCase(checkSchemeHolder.pending, (state) => {
//   state.checkLoading = true;
//   state.checkError = null;
// })
// .addCase(checkSchemeHolder.fulfilled, (state, action) => {
//   state.checkLoading = false;
//   state.isRegistered = action.payload.isEligible;
//   state.schemeHolder = action.payload.holder; // ← store full holder object
// })
// .addCase(checkSchemeHolder.rejected, (state, action) => {
//   state.checkLoading = false;
//   state.checkError = action.payload;
//   state.isRegistered = false; // Default to form on error
// })

// // Generate Order ID Cases
//       .addCase(generateOrderId.pending, (state) => {
//         state.paymentLoading = true;
//         state.paymentError = null;
//         state.orderData = null;
//       })
//       .addCase(generateOrderId.fulfilled, (state, action) => {
//         state.paymentLoading = false;
//         state.orderData = action.payload; // Contains orderId object and payment_key_id
//       })
//       .addCase(generateOrderId.rejected, (state, action) => {
//         state.paymentLoading = false;
//         state.paymentError = action.payload;
//       })
//       .addCase(fetchSchemeBanners.pending, (state) => {
//         state.bannersLoading = true;
//       })
//       .addCase(fetchSchemeBanners.fulfilled, (state, action) => {
//         state.bannersLoading = false;
//         state.schemeBanners = action.payload;
//       })
//       .addCase(fetchSchemeBanners.rejected, (state) => {
//         state.bannersLoading = false;
//       })
//       .addCase(updateSchemeDetails.pending, (state) => {
//         state.updateSchemeLoading = true;
//         state.updateSchemeError = null;
//         state.updateSchemeSuccess = null;
//       })
//       .addCase(updateSchemeDetails.fulfilled, (state, action) => {
//         state.updateSchemeLoading = false;
//         state.updateSchemeSuccess = action.payload;
//       })
//       .addCase(updateSchemeDetails.rejected, (state, action) => {
//         state.updateSchemeLoading = false;
//         state.updateSchemeError = action.payload;
//       })

//        // New cases for fetchUserSchemes
//       .addCase(fetchUserSchemes.pending, (state) => {
//         state.schemesLoading = true;
//         state.schemesError = null;
//       })
//       .addCase(fetchUserSchemes.fulfilled, (state, action) => {
//         state.schemesLoading = false;
//         state.userSchemes = action.payload;
//       })
//       .addCase(fetchUserSchemes.rejected, (state, action) => {
//         state.schemesLoading = false;
//         state.schemesError = action.payload;
//         state.userSchemes = [];
//       })
//       // --- Fetch Scheme Details Cases ---
//       .addCase(fetchSchemeDetails.pending, (state) => {
//         state.detailsLoading = true;
//         state.detailsError = null;
//         state.schemeDetails = null;
//       })
//       .addCase(fetchSchemeDetails.fulfilled, (state, action) => {
//         state.detailsLoading = false;
//         state.schemeDetails = action.payload;
//       })
//       .addCase(fetchSchemeDetails.rejected, (state, action) => {
//         state.detailsLoading = false;
//         state.detailsError = action.payload;
//       })
//       .addCase(paySchemeInstallment.pending, (state) => {
//         state.installmentPaymentLoading = true;
//         state.installmentPaymentSuccess = null;
//         state.installmentPaymentError = null;
//       })
//       .addCase(paySchemeInstallment.fulfilled, (state, action) => {
//         state.installmentPaymentLoading = false;
//         state.installmentPaymentSuccess = action.payload;
//         // Optional: you could store something more here if backend returns useful data
//         // state.lastPaymentRecord = action.payload.someData;
//       })
//       .addCase(paySchemeInstallment.rejected, (state, action) => {
//         state.installmentPaymentLoading = false;
//         state.installmentPaymentError = action.payload;
//       });
//   },
// });

// export const { resetSchemeStatus } = schemeSlice.actions;
// export default schemeSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config'; // Adjust path as needed
import api from '../../utils/api'; // Adjust path as needed

// ────────────────────────────────────────────────
// Existing thunks (only showing changed/new ones)
// ────────────────────────────────────────────────

export const addSchemeHolderDetails = createAsyncThunk(
  'scheme/addSchemeHolderDetails',
  async ({ userId, name, address, phoneNumber, documentProof }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        user_id: userId,
        name,
        address,
        phone_number: phoneNumber,
        document_proof: documentProof,
      };
      const res = await api.post(endpoints.ADD_SCHEME_HOLDER_DETAILS, payload);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      }
      return rejectWithValue(res.data?.message || 'Failed to register details');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Network Error');
    }
  }
);

export const fetchDailyMetalRates = createAsyncThunk(
  'scheme/fetchDailyMetalRates',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_DAILY_METAL_RATES);
      if (res.data?.status === 200 && res.data?.data?.length > 0) {
        return fulfillWithValue(res.data.data[0]);
      }
      return rejectWithValue(res.data?.message || 'Failed to fetch rates');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Network Error');
    }
  }
);

export const checkSchemeHolder = createAsyncThunk(
  'scheme/checkSchemeHolder',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.CHECK_SCHEME_HOLDER, { user_id: userId });
      if (res.data?.status === 200) {
        const holder = res.data.data?.[0] || null;
        return fulfillWithValue({
          isEligible: holder ? [1, 2].includes(holder.profile_status) : false,
          holder,
        });
      }
      return fulfillWithValue({ isEligible: false, holder: null });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to check scheme status');
    }
  }
);

export const generateOrderId = createAsyncThunk(
  'scheme/generateOrderId',
  async (amount, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GENERATE_ORDER_ID, { payment_amount: amount });
      if (res.data?.orderId) {
        return fulfillWithValue(res.data);
      }
      return rejectWithValue('Failed to generate Order ID');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSchemeBanners = createAsyncThunk(
  'scheme/fetchSchemeBanners',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_SCHEME_BANNERS);
      if (res.data?.status === 200 && Array.isArray(res.data.data)) {
        return fulfillWithValue(res.data.data);
      }
      return rejectWithValue('Failed to fetch banners');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchUserSchemes = createAsyncThunk(
  'scheme/fetchUserSchemes',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_USER_SCHEMES, { user_id: userId });
      if (res.data?.status === 200) {
        return fulfillWithValue(res.data.data || []);
      }
      return rejectWithValue(res.data?.message || 'Failed to fetch schemes');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Network Error');
    }
  }
);

export const fetchSchemeDetails = createAsyncThunk(
  'scheme/fetchSchemeDetails',
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_SCHEME_DETAILS, { id });
      if (res.data?.status === 200 && res.data?.data?.length > 0) {
        return fulfillWithValue(res.data.data[0]);
      }
      return rejectWithValue('Failed to fetch scheme details');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const paySchemeInstallment = createAsyncThunk(
  'scheme/paySchemeInstallment',
  async ({ schemeId, installmentAmount, paymentId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = {
        id: Number(schemeId),
        installment_amount: Number(installmentAmount),
        payment_id: paymentId.trim(),
      };

      const response = await api.post(endpoints.PAY_SCHEME_INSTALLMENT, payload);

      // Accept both 200 and 201 as success (your backend uses 201 for final payment)
      if (response.data?.status === 200 || response.data?.status === 201) {
        return fulfillWithValue({
          success: true,
          message: response.data.message || 'Installment recorded successfully',
          isSchemeCompleted: response.data.message?.toLowerCase().includes('scheme completed') || false,
          insertId: response.data?.data?.insertId || null,
        });
      }

      return rejectWithValue(response.data?.message || 'Failed to record installment');
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Network error while recording installment'
      );
    }
  }
);

export const updateSchemeDetails = createAsyncThunk(
  'scheme/updateSchemeDetails',
  async (updatePayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log('Updating Scheme Details Payload:', updatePayload);
      const res = await api.post(endpoints.UPDATE_SCHEME_DETAILS, updatePayload);
      console.log('Update Scheme Response:', res.data);

      if (res.data?.status === 200) {
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue(res.data?.message || 'Failed to update scheme details');
      }
    } catch (err) {
      console.error('updateSchemeDetails error:', err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ────────────────────────────────────────────────
// Slice
// ────────────────────────────────────────────────

const schemeSlice = createSlice({
  name: 'scheme',
  initialState: {
    loading: false,
    error: null,
    isRegistered: false,

    checkLoading: false,
    checkError: null,
    schemeHolder: null,

    metalRates: null,
    metalRatesLoading: false,
    metalRatesError: null,

    orderData: null,
    paymentLoading: false,
    paymentError: null,

    schemeBanners: [],
    bannersLoading: false,

    updateSchemeLoading: false,
    updateSchemeError: null,
    updateSchemeSuccess: null,

    userSchemes: [],
    schemesLoading: false,
    schemesError: null,

    // Single scheme detail view
    schemeDetails: null,
    detailsLoading: false,
    detailsError: null,

    // Installment payment
    installmentPaymentLoading: false,
    installmentPaymentSuccess: null,
    installmentPaymentError: null,
    lastPaymentMessage: null,  
    
    //     // Update Scheme
    updateSchemeLoading: false,
    updateSchemeError: null,
    updateSchemeSuccess: null,
    // ← helps UI know about "Scheme completed"
  },

  reducers: {
    resetSchemeStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.isRegistered = false;
      state.orderData = null;
      state.paymentError = null;
      state.updateSchemeSuccess = null;
      state.schemeDetails = null;
      state.lastPaymentMessage = null;
      state.installmentPaymentSuccess = null;
      state.installmentPaymentError = null;
    },

    clearInstallmentPaymentStatus: (state) => {
      state.installmentPaymentSuccess = null;
      state.installmentPaymentError = null;
      state.lastPaymentMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // addSchemeHolderDetails
      .addCase(addSchemeHolderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchemeHolderDetails.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(addSchemeHolderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchDailyMetalRates
      .addCase(fetchDailyMetalRates.pending, (state) => {
        state.metalRatesLoading = true;
        state.metalRatesError = null;
      })
      .addCase(fetchDailyMetalRates.fulfilled, (state, action) => {
        state.metalRatesLoading = false;
        state.metalRates = action.payload;
      })
      .addCase(fetchDailyMetalRates.rejected, (state, action) => {
        state.metalRatesLoading = false;
        state.metalRatesError = action.payload;
      })

      // checkSchemeHolder
      .addCase(checkSchemeHolder.pending, (state) => {
        state.checkLoading = true;
        state.checkError = null;
      })
      .addCase(checkSchemeHolder.fulfilled, (state, action) => {
        state.checkLoading = false;
        state.isRegistered = action.payload.isEligible;
        state.schemeHolder = action.payload.holder;
      })
      .addCase(checkSchemeHolder.rejected, (state, action) => {
        state.checkLoading = false;
        state.checkError = action.payload;
        state.isRegistered = false;
      })

      // generateOrderId
      .addCase(generateOrderId.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(generateOrderId.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.orderData = action.payload;
      })
      .addCase(generateOrderId.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      // fetchSchemeBanners
      .addCase(fetchSchemeBanners.pending, (state) => {
        state.bannersLoading = true;
      })
      .addCase(fetchSchemeBanners.fulfilled, (state, action) => {
        state.bannersLoading = false;
        state.schemeBanners = action.payload;
      })
      .addCase(fetchSchemeBanners.rejected, (state) => {
        state.bannersLoading = false;
      })

      // fetchUserSchemes
      .addCase(fetchUserSchemes.pending, (state) => {
        state.schemesLoading = true;
        state.schemesError = null;
      })
      .addCase(fetchUserSchemes.fulfilled, (state, action) => {
        state.schemesLoading = false;
        state.userSchemes = action.payload;
      })
      .addCase(fetchUserSchemes.rejected, (state, action) => {
        state.schemesLoading = false;
        state.schemesError = action.payload;
        state.userSchemes = [];
      })

      // fetchSchemeDetails
      .addCase(fetchSchemeDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchSchemeDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.schemeDetails = action.payload;
      })
      .addCase(fetchSchemeDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      })

      // paySchemeInstallment
      .addCase(paySchemeInstallment.pending, (state) => {
        state.installmentPaymentLoading = true;
        state.installmentPaymentSuccess = null;
        state.installmentPaymentError = null;
        state.lastPaymentMessage = null;
      })
      .addCase(paySchemeInstallment.fulfilled, (state, action) => {
        state.installmentPaymentLoading = false;
        state.installmentPaymentSuccess = action.payload;
        state.lastPaymentMessage = action.payload.message;
      })
      .addCase(paySchemeInstallment.rejected, (state, action) => {
        state.installmentPaymentLoading = false;
        state.installmentPaymentError = action.payload;
      })
            .addCase(updateSchemeDetails.pending, (state) => {
        state.updateSchemeLoading = true;
        state.updateSchemeError = null;
        state.updateSchemeSuccess = null;
      })
      .addCase(updateSchemeDetails.fulfilled, (state, action) => {
        state.updateSchemeLoading = false;
        state.updateSchemeSuccess = action.payload;
      })
      .addCase(updateSchemeDetails.rejected, (state, action) => {
        state.updateSchemeLoading = false;
        state.updateSchemeError = action.payload;
      })
  },
});

export const { resetSchemeStatus, clearInstallmentPaymentStatus } = schemeSlice.actions;
export default schemeSlice.reducer;