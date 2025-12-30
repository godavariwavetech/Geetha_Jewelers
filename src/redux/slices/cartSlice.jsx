
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(cartItem,"to add product to cart i am sending this payload")
      const res = await api.post(endpoints.ADD_USER_CART_ITEMS, cartItem);
      console.log('addToCart response:', res.data);
      if (res.data?.status === 200 && res.data?.data) {
        // return fulfillWithValue(res.data.data);
        return fulfillWithValue(res.data.data)
      } else {
        return rejectWithValue(res.data?.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('addToCart error:', {
        message: err.message ,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to add to cart',
        status: err.response?.status,
      });
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { fulfillWithValue, rejectWithValue }) => {

    try {
      console.log(userId,"to get cart itemss+++++++++++++++")
      const res = await api.post(endpoints.GET_USER_CART_ITEMS, { user_id: userId });
      
      console.log('fetchCartItems full response:', res); // add this log to see

      if (res.data?.status === 200) {
        const items = res.data.data || []; // always array
        return fulfillWithValue(items);
      } else {
        return rejectWithValue(res.data?.message || 'Failed to fetch cart items');
      }
    } catch (err) {
      console.error('fetchCartItems error:', err);
      return rejectWithValue(err.response?.data?.message || err.message || 'Network error');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartId, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(cartId,"pay load to remove cart item ")
      if (!cartId) {
        throw new Error('Cart ID is missing');
      }
      const res = await api.post(endpoints.DELETE_USER_CART_ITEMS, { cart_id: cartId });
      console.log('removeFromCart response+++++++++++++++)))))))):', res.data);
      if (res.data?.status === 200) {
        return fulfillWithValue(cartId);
      } else {
        return rejectWithValue(res.data?.message || 'Failed to remove from cart');
      }
    } catch (err) {
      console.error('removeFromCart error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to remove from cart',
        status: err.response?.status,
      });
    }
  }
);

// New async thunk for updating quantity
export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ cartId, quantity }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.UPDATE_QUANTITY_IN_CART, {
        cart_id: cartId,
        quantity,
      });
      console.log('updateCartQuantity response:', res.data);
      if (res.data?.status === 200) {
        return fulfillWithValue({ cartId, quantity });
      } else {
        return rejectWithValue(res.data?.message || 'Failed to update quantity');
      }
    } catch (err) {
      console.error('updateCartQuantity error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to update quantity',
        status: err.response?.status,
      });
    }
  }
);

// New async thunk for updating size
export const updateCartSize = createAsyncThunk(
  'cart/updateCartSize',
  async ({ cartId, varient_size_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.UPDATE_SIZE_IN_CART, {
        cart_id: cartId,
        varient_size_id,
      });
      console.log('updateCartSize response:', res.data);
      if (res.data?.status === 200) {
        return fulfillWithValue({ cartId, varient_size_id });
      } else {
        return rejectWithValue(res.data?.message || 'Failed to update size');
      }
    } catch (err) {
      console.error('updateCartSize error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to update size',
        status: err.response?.status,
      });
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    lastAddedItemId: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetLastAddedItem: (state) => {
      state.lastAddedItemId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAddedItemId = action.payload.insertId;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchCartItems.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.cartItems = action.payload.map((item) => ({
      //     ...item,
      //     selectedSize: item.size,
      //     selectedQty: item.quantity || 1, // Use quantity from API if available
      //   }));
      // })
      // .addCase(fetchCartItems.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload.message;
      // })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
  state.loading = false;
  state.cartItems = action.payload; // direct array, no map
})
.addCase(fetchCartItems.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.cartItems = []; // optional, clear on error
})
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(removeFromCart.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.cartItems = state.cartItems.filter((item) => item.cart_id !== action.payload);
      // })
    .addCase(removeFromCart.fulfilled, (state, action) => {
  state.loading = false;
  const removedId = String(action.payload);
  state.cartItems = state.cartItems.filter(
    (item) => String(item.cart_id) !== removedId
  );
})
.addCase(removeFromCart.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || action.payload || 'Failed to remove item';
  Alert.alert('Remove Failed', state.error); // Optional: show error
})
      // New cases for update quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.map((item) =>
          item.cart_id === action.payload.cartId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // New cases for update size
      .addCase(updateCartSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartSize.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.map((item) =>
          item.cart_id === action.payload.cartId
            ? { ...item, varient_size_id: action.payload.varient_size_id }
            : item
        );
      })
      .addCase(updateCartSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError, resetLastAddedItem } = cartSlice.actions;
export default cartSlice.reducer;
