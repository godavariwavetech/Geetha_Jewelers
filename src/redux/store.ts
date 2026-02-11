import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthSlice from './slices/authSlice';
import categoryReducer from './slices/categorySlice'; // 👈 import it
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import couponReducer from './slices/couponSlice';
import pincodeReducer from './slices/pincodeSlice';
import applicationDataReducer from './slices/applicationDataSlice';
import orderReducer from './slices/orderSlice'; 
import serviceAvailabilityReducer from './slices/serviceAvailabilitySlice'
import schemeReducer from './slices/schemeSlice';
import searchReducer from './slices/searchSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedAuth = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
  reducer: {
    Auth: persistedAuth,
    category: categoryReducer,
    wishlist: wishlistReducer, 
    cart:cartReducer,
    coupon: couponReducer,
    pincode: pincodeReducer,
    applicationData: applicationDataReducer,
    order: orderReducer,
    serviceAvailability: serviceAvailabilityReducer,
    scheme: schemeReducer,
    search: searchReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck can remain commented
    }),
});

export const persistorStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
