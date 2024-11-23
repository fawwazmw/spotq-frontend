import Image from 'next/image';
// redux/features/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const getStrapiURL = (url) => {
  if (!url) return null; // Jika URL tidak ada, kembalikan null
  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

// Fetch Coffee Shops
export const fetchCoffeeShops = createAsyncThunk(
    'products/fetchCoffeeShops',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(getStrapiURL('/api/coffee-shops?populate=*'));

        return response.data.data.map(item => ({
          id: item.id,
          img: {
            url: getStrapiURL(item.img?.formats?.small?.url),
          },
          img_big: {
            url: getStrapiURL(item.img_big?.formats?.large?.url),
          },
          title: item.title,
          location: item.location,
          description: item.description,
          category: item.category,
          price: item.price,
          tag: item.tag,
          status: item.availability === 'open' ? 'available' : 'unavailable',
          book: item.book || '0',
        }));
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
);



// Filter Coffee Shops
export const filterCoffeeShops = createAsyncThunk(
    'products/filterCoffeeShops',
    async ({ category, tag }, { rejectWithValue }) => {
      try {
        let url = getStrapiURL('/api/coffee-shops?populate=*');

        if (category) {
          url += `&filters[category][$eq]=${encodeURIComponent(category)}`;
        }

        if (tag) {
          url += `&filters[tag][$eq]=${encodeURIComponent(tag)}`;
        }

        const response = await axios.get(url);
        return response.data.data.map(item => ({
          id: item.id,
          ...item,
          img: getStrapiURL(item.img?.formats?.small?.url),
        }));
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    loading: 'idle',
    error: null,
    specificProduct: null,
    allUniqueCategory: [],
    allUniqueTag: [],
    addToCart: typeof window !== 'undefined' && localStorage.getItem('addToCart')
        ? JSON.parse(localStorage.getItem('addToCart'))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    wishlist: typeof window !== 'undefined' && localStorage.getItem('addToWishList')
        ? JSON.parse(localStorage.getItem('addToWishList'))
        : []
  },
  reducers: {
    specificItem: (state, { payload }) => {
      state.specificProduct = state.products.find(product => product.id === payload) || null;
    },
    addToProduct: (state, { payload }) => {
      const itemIndex = state.addToCart.findIndex(item => item.id === payload.id);
      if (itemIndex >= 0) {
        state.addToCart[itemIndex].cartQuantity += 1;
        toast.info('Increased Product Quantity', { position: 'top-left' });
      } else {
        const tempProduct = { ...payload, cartQuantity: 1 };
        state.addToCart.push(tempProduct);
        toast.success(`${payload.title} added to cart`, { position: 'top-left' });
      }
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
      state.cartTotalQuantity = state.addToCart.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.addToCart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
    },
    decreaseCart: (state, { payload }) => {
      const itemIndex = state.addToCart.findIndex(item => item.id === payload.id);
      if (itemIndex >= 0 && state.addToCart[itemIndex].cartQuantity > 1) {
        state.addToCart[itemIndex].cartQuantity -= 1;
        toast.info('Decreased Product Quantity', { position: 'top-left' });
      } else if (itemIndex >= 0 && state.addToCart[itemIndex].cartQuantity === 1) {
        state.addToCart = state.addToCart.filter(item => item.id !== payload.id);
        toast.error('Removed from your cart', { position: 'top-left' });
      }
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
      state.cartTotalQuantity = state.addToCart.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.addToCart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
    },
    addToWishList: (state, { payload }) => {
      const existingItemIndex = state.wishlist.findIndex(item => item.id === payload.id);
      if (existingItemIndex === -1) {
        state.wishlist.push(payload);
        Swal.fire({
          icon: 'success',
          title: `${payload.title}`,
          text: 'Added to your wishlist',
        });
        localStorage.setItem('addToWishList', JSON.stringify(state.wishlist));
      } else {
        toast.info(`${payload.title} is already in your wishlist`);
      }
    },
    removeProduct: (state, { payload }) => {
      state.addToCart = state.addToCart.filter(cart => cart.id !== payload);
      toast.error('Removed from your cart', { position: 'top-left' });
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
      state.cartTotalQuantity = state.addToCart.reduce((total, item) => total + item.cartQuantity, 0);
      state.cartTotalAmount = state.addToCart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
    },
    clearCart: (state) => {
      state.addToCart = [];
      localStorage.setItem('addToCart', JSON.stringify(state.addToCart));
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
    removeWishListProduct: (state, { payload }) => {
      state.wishlist = state.wishlist.filter(product => product.id !== payload.id);
      toast.error(`${payload.title} removed from your wishlist`, { position: 'top-left' });
      localStorage.setItem('addToWishList', JSON.stringify(state.wishlist));
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCoffeeShops.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(fetchCoffeeShops.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.products = action.payload;
          state.allUniqueCategory = [...new Set(action.payload.map(item => item.category))];
          state.allUniqueTag = [...new Set(action.payload.map(item => item.tag))];
        })
        .addCase(fetchCoffeeShops.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload;
        });
  },
});

export const {
  specificItem,
  addToProduct,
  decreaseCart, // Tambahkan decreaseCart ke ekspor
  addToWishList,
  removeProduct,
  clearCart,
  removeWishListProduct
} = productSlice.actions;

export const selectCartProduct = (state) => state.products.addToCart;
export const selectCartTotal = (state) => state.products.cartTotalAmount;
export const selectCartQuantity = (state) => state.products.cartTotalQuantity;
export const selectWishlist = (state) => state.products.wishlist;
export const selectCoffeeShops = (state) => state.products.products;
export const selectFilteredCoffeeShops = (state) => state.products.filteredProducts;

export default productSlice.reducer;
