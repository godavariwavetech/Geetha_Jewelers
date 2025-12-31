
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/config';
import api from '../../utils/api';


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_CATEGORIES);
   
      if (res.data?.data) {
        // Removed the .slice(0, 4) to return all categories
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No category data found');
      }
    } catch (err) {
      console.error('fetchCategories error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch categories',
        status: err.response?.status,
      });
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  'category/fetchSubcategories',
  async (categoryId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_SUBCATEGORY, {
        category_id: categoryId,
      });
      
      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No subcategory data found');
      }
    } catch (err) {
      console.error('fetchSubcategories error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch subcategories',
        status: err.response?.status,
      });
    }
  }
);

export const fetchBanners = createAsyncThunk(
  'category/fetchBanners',
  async (_, { fulfillWithValue, rejectWithValue }) => {  // No parameters needed
    try {
      // Change from POST to GET, and remove any payload
      const res = await api.get(endpoints.GET_BANNERS);
      
      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No banner data found');
      }
    } catch (err) {
      console.error('fetchBanners error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch banners',
        status: err.response?.status,
      });
    }
  }
);
export const fetchProducts = createAsyncThunk(
  'category/fetchProducts',
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(payload,"to get products++++++++++++")
      // Construct the correct payload based on what's provided
      let requestPayload = { user_id: payload.userId };

      // Case 1: Direct category navigation (category_id)
      if (payload.categoryId !== undefined) {
        requestPayload.category_id = payload.categoryId;
      }

      // Case 2: Home section click (section_type + reference_id)
      else if (payload.section_type && payload.reference_id !== undefined) {
        requestPayload.section_type = payload.section_type; // e.g. "Diamond", "Gender", "Category"
        requestPayload.reference_id = payload.reference_id;
      }

      // Case 3: Banner click (target_type + target_value)
      else if (payload.target_type && payload.target_value !== undefined) {
        requestPayload.target_type = payload.target_type;     // e.g. "subcategory"
        requestPayload.target_value = payload.target_value;   // string or number
      }

      // Optional: gender case (if needed separately)
      else if (payload.gender !== undefined) {
        // If your backend supports a gender filter, add it here
        // requestPayload.gender = payload.gender;
        return rejectWithValue('Gender filtering not implemented on backend');
      }

      const res = await api.post(endpoints.GET_PRODUCTS, requestPayload);
console.log(res.data,"from get products api_________________________")
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No products found');
      }
    } catch (err) {
      console.error('fetchProducts error:', err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch products',
        status: err.response?.status,
      });
    }
  }
);

export const fetchCategoriesWithSubcategories = createAsyncThunk(
  'category/fetchCategoriesWithSubcategories',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_CATEGORIES_WITH_SUBCATEGORIES);

      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No categories with subcategories found');
      }
    } catch (err) {
      console.error('fetchCategoriesWithSubcategories error:', err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch categories',
      });
    }
  }
);
export const fetchHomeSections = createAsyncThunk(
  'category/fetchHomeSections',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_HOME_SECTIONS);

      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No home sections data found');
      }
    } catch (err) {
      console.error('fetchHomeSections error:', err);
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch home sections',
      });
    }
  }
);
export const fetchBrands = createAsyncThunk(
  'category/fetchBrands',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_BRANDS);
    
      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No brands data found');
      }
    } catch (err) {
      console.error('fetchBrands error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch brands',
        status: err.response?.status,
      });
    }
  }
);

export const fetchDiscountBanners = createAsyncThunk(
  'category/fetchDiscountBanners',
  async (categoryId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_OFFERBANNER, {
        category_id: categoryId,
      });
      
      if (res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No discount banner data found');
      }
    } catch (err) {
      console.error('fetchDiscountBanners error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch discount banners',
        status: err.response?.status,
      });
    }
  }
);



export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async ({ user_id, product_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_PRODUCTDETAILS, {
        user_id,
        product_id,
      });
      console.log(res.data,"product details dataaaaaaaa")

      if (res.data?.status === 200 && res.data?.data && res.data.data.length > 0) {
     
        return fulfillWithValue(res.data.data[0]);
      } else {
        return rejectWithValue('No product detail data found');
      }
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch product details',
      });
    }
  }
);
export const fetchRecommendedProducts = createAsyncThunk(
  'category/fetchRecommendedProducts',
  async ({ user_id, subcategory_id, product_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(user_id,subcategory_id,product_id,"to get recommonded products")
      const res = await api.post(endpoints.GET_RECOMMONDED_PRODUCTS, {
        user_id,
        subcategory_id,
        product_id,
      });
     console.log(res,"recommonded products dtaaaaaaaaa from api ")
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No recommended products data found');
      }
    } catch (err) {
      console.error('fetchRecommendedProducts error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch recommended products',
        status: err.response?.status,
      });
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  'category/fetchTopProducts',
  async ({ userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const payload = { user_id: userId };
      const res = await api.post(endpoints.GET_TOP_PRODUCTS, payload);
      
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No top products data found');
      }
    } catch (err) {
      console.error('fetchTopProducts error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch top products',
        status: err.response?.status,
      });
    }
  }
);

export const fetchUnderDeals = createAsyncThunk(
  'category/fetchUnderDeals',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_UNDERDEALS);
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No under deals data found');
      }
    } catch (err) {
      console.error('fetchUnderDeals error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch under deals',
        status: err.response?.status,
      });
    }
  }
);

export const fetchGlobalSearch = createAsyncThunk(
  'category/fetchGlobalSearch',
  async (searchTerm, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GLOBAL_SEARCH, {
        searchterm: searchTerm,
      });

      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No search results found');
      }
    } catch (err) {
      console.error('fetchGlobalSearch error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch search results',
        status: err.response?.status,
      });
    }
  }
);

export const fetchPromoVideo = createAsyncThunk(
  'category/fetchPromoVideo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.GET_PROMO_VIDEO);
      return response.data.data; // Returns array of video objects: [{ id: 1, video: "url" }]
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch promotional video');
    }
  }
);
export const fetchOccasions = createAsyncThunk(
  'category/fetchOccasions',
  async (categoryId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post(endpoints.GET_OCCASIONS, {
        category_id: categoryId,
      });
      
      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No occasion data found');
      }
    } catch (err) {
      console.error('fetchOccasions error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch occasions',
        status: err.response?.status,
      });
    }
  }
);

export const fetchCatalogueProducts = createAsyncThunk(
  'category/fetchCatalogueProducts',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.GET_CATALOGE_PRODUCTS);

      if (res.data?.status === 200 && res.data?.data) {
        return fulfillWithValue(res.data.data);
      } else {
        return rejectWithValue('No catalogue products found');
      }
    } catch (err) {
      console.error('fetchCatalogueProducts error:', {
        message: err.message,
        status: err.response?.status,
        response: err.response?.data,
      });
      return rejectWithValue({
        message: err.response?.data?.message || err.message || 'Failed to fetch catalogue products',
        status: err.response?.status,
      });
    }
  }
);


const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    subcategories: [],
    loading: false,
    error: null,
    subLoading: false,
    subError: null,
    banners: [],
    bannersLoading: false,
    bannersError: null,
    brands: [],
    brandsLoading: false,
    brandsError: null,
    discountBanners: [],
    discountBannersLoading: false,
    discountBannersError: null,
    products: [],
    productsLoading: false,
    productsError: null,
    productDetails: null,
    productDetailsLoading: false,
    requestedProductId: null,
    productDetailsError: null,
    recommendedProducts: [],
    recommendedProductsLoading: false,
    recommendedProductsError: null,
    topProducts: [], // New state for top products
    topProductsLoading: false, // New state for loading
    topProductsError: null, // New state for errors
    underDeals: [], // New state for under deals
    underDealsLoading: false, // New state for loading
    underDealsError: null,
    searchSuggestions: [], // New state for global search suggestions
    searchLoading: false, // New state for search loading
    searchError: null,
    promoVideos: [],
    promoVideosLoading: false,
    promoVideosError: null,
    occasions: [], // New state for occasions
    occasionsLoading: false, // New state for occasions loading
    occasionsError: null,
    categoriesWithSubs: [],
    homeSections: [],
homeSectionsLoading: false,
homeSectionsError: null,

  catalogueProducts: [],
    catalogueProductsLoading: false,
    catalogueProductsError: null,
  },
  reducers: {
    clearSearchSuggestions: (state) => {
      state.searchSuggestions = [];
      state.searchError = null;
      state.promoVideosError = null; 
      state.occasionsError = null;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.productDetailsLoading = false;
      state.productDetailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.subLoading = true;
        state.subError = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subLoading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subLoading = false;
        state.subError = action.payload.message;
      })
      .addCase(fetchBanners.pending, (state) => {
        state.bannersLoading = true;
        state.bannersError = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannersLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.bannersLoading = false;
        state.bannersError = action.payload.message;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.brandsLoading = true;
        state.brandsError = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandsLoading = false;
        state.brandsError = action.payload.message;
      })
      .addCase(fetchDiscountBanners.pending, (state) => {
        state.discountBannersLoading = true;
        state.discountBannersError = null;
      })
      .addCase(fetchDiscountBanners.fulfilled, (state, action) => {
        state.discountBannersLoading = false;
        state.discountBanners = action.payload;
      })
      .addCase(fetchDiscountBanners.rejected, (state, action) => {
        state.discountBannersLoading = false;
        state.discountBannersError = action.payload.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload.message;
      })
     .addCase(fetchProductDetails.pending, (state, action) => {
  state.productDetailsLoading = true;
  state.productDetailsError = null;
  // Track which product_id we're currently fetching
  state.requestedProductId = action.meta.arg.product_id;
})
.addCase(fetchProductDetails.fulfilled, (state, action) => {
  // Only update if this response matches the current request
  if (state.requestedProductId === action.meta.arg.product_id) {
    state.productDetailsLoading = false;
    state.productDetails = action.payload;
  }
})
.addCase(fetchProductDetails.rejected, (state, action) => {
  state.productDetailsLoading = false;
  state.productDetailsError = action.payload?.message || 'Error fetching product details';
  // Clear stale data on error too
  if (state.requestedProductId === action.meta.arg.product_id) {
    state.productDetails = null;
  }
})

      .addCase(fetchRecommendedProducts.pending, (state) => {
        state.recommendedProductsLoading = true;
        state.recommendedProductsError = null;
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
        state.recommendedProductsLoading = false;
        state.recommendedProducts = action.payload;
      })
      .addCase(fetchRecommendedProducts.rejected, (state, action) => {
        state.recommendedProductsLoading = false;
        state.recommendedProductsError = action.payload.message;
      })
      .addCase(fetchTopProducts.pending, (state) => {
        state.topProductsLoading = true;
        state.topProductsError = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProductsLoading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.topProductsLoading = false;
        state.topProductsError = action.payload.message;
      })
      .addCase(fetchUnderDeals.pending, (state) => {
        state.underDealsLoading = true;
        state.underDealsError = null;
      })
      .addCase(fetchUnderDeals.fulfilled, (state, action) => {
        state.underDealsLoading = false;
        state.underDeals = action.payload;
      })
      .addCase(fetchUnderDeals.rejected, (state, action) => {
        state.underDealsLoading = false;
        state.underDealsError = action.payload.message;
      })
      .addCase(fetchGlobalSearch.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchGlobalSearch.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchSuggestions = action.payload;
        console.log('Search suggestions updated:', action.payload); // Debug log
      })
      .addCase(fetchGlobalSearch.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload.message;
        console.log('Search error:', action.payload.message); // Debug log
      })
      .addCase(fetchPromoVideo.pending, (state) => {
        state.promoVideosLoading = true;
        state.promoVideosError = null;
      })
      .addCase(fetchPromoVideo.fulfilled, (state, action) => {
        state.promoVideosLoading = false;
        state.promoVideos = action.payload;
      })
      .addCase(fetchPromoVideo.rejected, (state, action) => {
        state.promoVideosLoading = false;
        state.promoVideosError = action.payload;
      })
      .addCase(fetchOccasions.pending, (state) => {
        state.occasionsLoading = true;
        state.occasionsError = null;
      })
      .addCase(fetchOccasions.fulfilled, (state, action) => {
        state.occasionsLoading = false;
        state.occasions = action.payload;
      })
      .addCase(fetchOccasions.rejected, (state, action) => {
        state.occasionsLoading = false;
        state.occasionsError = action.payload.message;
      })
      .addCase(fetchCategoriesWithSubcategories.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchCategoriesWithSubcategories.fulfilled, (state, action) => {
  state.loading = false;
  state.categoriesWithSubs = action.payload; // Make sure to add this field in initialState
})
.addCase(fetchCategoriesWithSubcategories.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload.message;
})
.addCase(fetchHomeSections.pending, (state) => {
  state.homeSectionsLoading = true;
  state.homeSectionsError = null;
})
.addCase(fetchHomeSections.fulfilled, (state, action) => {
  state.homeSectionsLoading = false;
  state.homeSections = action.payload;
})
.addCase(fetchHomeSections.rejected, (state, action) => {
  state.homeSectionsLoading = false;
  state.homeSectionsError = action.payload.message;
})
.addCase(fetchCatalogueProducts.pending, (state) => {
        state.catalogueProductsLoading = true;
        state.catalogueProductsError = null;
      })
      .addCase(fetchCatalogueProducts.fulfilled, (state, action) => {
        state.catalogueProductsLoading = false;
        state.catalogueProducts = action.payload;
      })
      .addCase(fetchCatalogueProducts.rejected, (state, action) => {
        state.catalogueProductsLoading = false;
        state.catalogueProductsError = action.payload.message || action.payload;
      })
  },
});
export const { clearSearchSuggestions ,clearProductDetails } = categorySlice.actions;
export default categorySlice.reducer;