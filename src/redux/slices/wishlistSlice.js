
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { endpoints, baseURL } from '../../config/config';
// import api from '../../utils/api'; // Assuming you have an axios instance set up


// const initialState= {
//   wishlist: [],
//   loading: false,
//   error: null,
//   addRemoveLoader:null
// }

// export const addToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async ({ user_id, product_id, varient_id }, { rejectWithValue }) => {
//     try {
//       const payload = {
//         user_id,
//         product_id,
//         varient_id,
//       };

//       const response = await api.post(endpoints.ADD_USER_WISHLIST, payload);
//       console.log("response of added items in wishlistttttttttttttttt",response.data)

//       if (response.data.status === 200) {
//         const insertId = response.data.data?.insertId; 
//         return {
//           product_id,
//           wishlist_id: insertId, 
//         };
//       } else {
//         return rejectWithValue('Failed to add to wishlist');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message || 'Network Error');
//     }
//   }
// );

// export const fetchWishlist = createAsyncThunk(
//   'wishlist/fetchWishlist',
//   async (customerId, { rejectWithValue }) => {
//     try {
//       const response = await api.post(endpoints.GET_USER_WISHLIST, { user_id:customerId });
//       console.log(response,"+++++++++++++++++API")
//       if (response.data.status === 200) {
//         return response.data.data;
//       } else {
//         return rejectWithValue('Failed to fetch wishlist');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async ({ wishlist_id }, { rejectWithValue }) => {
//     try {
//       console.log("speed")
//       const response = await api.post(endpoints.DELETE_USER_WISHLIST, {
//         wishlist_id,
//       });
//       console.log("hellog remove", response)
      
//       if (response.data.status === 200) {
       
//         return  {wishlist_id};
//       } else {
//         return rejectWithValue('Failed to remove from wishlist');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message || 'Network Error');
//     }
//   }
// );
// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     toggleWishlistLocal(state, action) {
//       const index = state.wishlist.indexOf(action.payload);
//       if (index >= 0) {
//         state.wishlist.splice(index, 1);
//       } else {
//         state.wishlist.push(action.payload);
//       }
//     },
//     toggleWishlistItem:(state,action)=>{
//       console.log(action.payload,"++++++++ACTION")
//       state.addRemoveLoader=action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // ✅ Add to Wishlist
//       .addCase(addToWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist.push(action.payload.product_id);
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
  
//       // ✅ Fetch Wishlist
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(removeFromWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         const idToRemove = action.payload.wishlist_id;
//         state.wishlist = state.wishlist.filter(item => item.wishlist_id !== idToRemove);
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
  
// });

// export const { toggleWishlistLocal,toggleWishlistItem } = wishlistSlice.actions;
// export default wishlistSlice.reducer;
// alex annayya petting wishlist 
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { endpoints } from '../../config/config';
// import api from '../../utils/api';

// const initialState = {
//   wishlist: [],
//   loading: false,
//   error: null,
//   addRemoveLoader: null,
// };

// export const addToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async ({ user_id, product_id, varient_id }, { rejectWithValue }) => {
//     try {
//       const payload = {
//         user_id,
//         product_id,
//         varient_id,
//       };
//       const response = await api.post(endpoints.ADD_USER_WISHLIST, payload);
//       console.log('addToWishlist response:', response.data);
//       if (response.data.status === 200) {
//         const insertId = response.data.data?.insertId;
//         return {
//           product_id,
//           varient_id,
//           wishlist_id: insertId,
//           wishlist_flag: true,
//         };
//       } else {
//         const errorMessage = response.data.message || 'Failed to add to wishlist';
//         return rejectWithValue(errorMessage);
//       }
//     } catch (error) {
//       console.error('addToWishlist error:', error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Network Error: Unable to add to wishlist';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const fetchWishlist = createAsyncThunk(
//   'wishlist/fetchWishlist',
//   async (customerId, { rejectWithValue }) => {
//     try {
//       const response = await api.post(endpoints.GET_USER_WISHLIST, { user_id: customerId });
//       console.log('fetchWishlist response:', response.data);
//       if (response.data.status === 200) {
//         return response.data.data;
//       } else {
//         const errorMessage = response.data.message || 'Failed to fetch wishlist';
//         return rejectWithValue(errorMessage);
//       }
//     } catch (error) {
//       console.error('fetchWishlist error:', error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Network Error: Unable to fetch wishlist';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async ({ wishlist_id }, { rejectWithValue }) => {
//     try {
//       console.log('removeFromWishlist payload:', { wishlist_id });
//       const response = await api.post(endpoints.DELETE_USER_WISHLIST, {
//         wishlist_id,
//       });
//       console.log('removeFromWishlist response:', response.data);
//       if (response.data.status === 200) {
//         return { wishlist_id };
//       } else {
//         const errorMessage = response.data.message || 'Failed to remove from wishlist';
//         return rejectWithValue(errorMessage);
//       }
//     } catch (error) {
//       console.error('removeFromWishlist error:', error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Network Error: Unable to remove from wishlist';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     toggleWishlistLocal(state, action) {
//       const index = state.wishlist.indexOf(action.payload);
//       if (index >= 0) {
//         state.wishlist.splice(index, 1);
//       } else {
//         state.wishlist.push(action.payload);
//       }
//     },
//     toggleWishlistItem: (state, action) => {
//       console.log('toggleWishlistItem action:', action.payload);
//       state.addRemoveLoader = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist.push({
//           product_id: action.payload.product_id,
//           varient_id: action.payload.varient_id,
//           wishlist_id: action.payload.wishlist_id,
//           wishlist_flag: true,
//         });
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload.map((item) => ({
//           product_id: item.product_id,
//           varient_id: item.varient_id || item.variant_id,
//           wishlist_id: item.wishlist_id,
//           wishlist_flag: true,
//           product_image: item.product_image,
//           brand_name: item.brand_name,
//           product_name: item.product_name,
//           selling_price: item.selling_price,
//         }));
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeFromWishlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         const idToRemove = action.payload.wishlist_id;
//         state.wishlist = state.wishlist.filter((item) => item.wishlist_id !== idToRemove);
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { toggleWishlistLocal, toggleWishlistItem } = wishlistSlice.actions;
// export default wishlistSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
  addRemoveLoader: null,
};

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ user_id, product_id, varient_id }, { rejectWithValue }) => {
    try {
      const payload = { user_id, product_id, varient_id };
      const response = await api.post(endpoints.ADD_USER_WISHLIST, payload);
      console.log('addToWishlist response:', response.data);

      if (response.data.status === 200) {
        const insertId = response.data.data?.insertId;
        return {
          product_id,
          varient_id,
          wishlist_id: insertId,
          wishlist_flag: true,
        };
      } else {
        return rejectWithValue(response.data.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('addToWishlist error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Network Error: Unable to add to wishlist'
      );
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.GET_USER_WISHLIST, { user_id: customerId });
      console.log('fetchWishlist response:', response.data);

      if (response.data.status === 200) {
        return response.data.data; // 👈 Full response
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('fetchWishlist error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Network Error: Unable to fetch wishlist'
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ wishlist_id }, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.DELETE_USER_WISHLIST, { wishlist_id });
      console.log('removeFromWishlist response:', response.data);

      if (response.data.status === 200) {
        return { wishlist_id };
      } else {
        return rejectWithValue(response.data.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('removeFromWishlist error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Network Error: Unable to remove from wishlist'
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistLocal(state, action) {
      const index = state.wishlist.indexOf(action.payload);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(action.payload);
      }
    },
    toggleWishlistItem(state, action) {
      state.addRemoveLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push({
          ...action.payload, // contains product_id, varient_id, wishlist_id, wishlist_flag
        });
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Store full objects from backend
        state.wishlist = action.payload.map((item) => ({
          ...item,
          varient_id: item.varient_id || item.variant_id,
          wishlist_flag: true,
        }));
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const idToRemove = action.payload.wishlist_id;
        state.wishlist = state.wishlist.filter((item) => item.wishlist_id !== idToRemove);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleWishlistLocal, toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;

