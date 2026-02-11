import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';


export const fetchGlobalSearch = createAsyncThunk(
  'search/fetchGlobalSearch',
  async ({ query }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GLOBAL_SEARCH, {
        searchterm: query,
       
      });
console.log(res,"search texttttttttt")
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No search results found');
      }
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch search results',
        status: err.response?.status,
      });
    }
  }
);
const searchSlice = createSlice({
  name: 'search',
  initialState: {
searchSuggestions: [], // Ensure this is always an array
  loading: false,
  error: null,
  },
  reducers: {
    clearSearchSuggestions: (state) => {
      state.searchSuggestions = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchSuggestions = action.payload;
      })
      .addCase(fetchGlobalSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : action.payload?.message;
      });
  },
});

export const { clearSearchSuggestions } = searchSlice.actions;
export default searchSlice.reducer;