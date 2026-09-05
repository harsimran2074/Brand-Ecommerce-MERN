import { createSlice } from "@reduxjs/toolkit"

import p_img3 from "../assets/p_img3.png";
import BagItem from "../components/BagItem";
import { toast } from "react-toastify";
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

//fetch products from backend
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
   const response = await axios.get(backendUrl + "/api/product/get");

   return response.data;
})

//ading item to cart
export const addToCart = createAsyncThunk(
   "bagItems/addToCart",
   async ({ itemId, size }, thunkAPI) => {

      try {
         const token = localStorage.getItem("token");

         const response = await axios.post(
            backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } }
         );
         return response.data;

      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to add to cart"
         );
      }
   }
);

export const allItemSlice = createSlice({
   name: "allItems",

   initialState: {
      products: [],
      loading: true,
      error: null
   },

   reducers: {
      addProduct: (state, action) => {
         state.products.push(action.payload);
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
         })

         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload?.products)
               ? action.payload.products
               : [];
         })

         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message;
         });
   }
});

export const bagItemSlice = createSlice({
   name: "bagItems",
   initialState: [{
      _id: "aaaac",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 220,
      image: [p_img3],
      category: "Kids",
      subCategory: "Topwear",
      size: "S",
      quantity: 1,
      date: 1716234545448,
      bestseller: true
   }],
   reducers: {
      addToBag: (state, action) => {
         const item = action.payload
         const existingItem = state.find((cartItem) => cartItem._id === item._id && cartItem.size === item.size);

         if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
         } else {
            toast.success("Added to cart!");
            state.push({ ...item, quantity: item.quantity || 1 });
         }
      },
      removeFromCart: (state, action) => {
         const payload = action.payload;
         if (typeof payload === 'object' && payload !== null) {
            const id = payload._id || payload.id;
            const size = payload.size;
            return state.filter((item) => !(item._id === id && (!size || item.size === size)));
         }
         return state.filter((item) => item._id !== payload);
      },
      updateQuantity: (state, action) => {
         const { size, change } = action.payload;
         const id = action.payload._id || action.payload.id;
         const item = state.find((item) => item._id === id && (size ? item.size === size : true));
         if (item) {
            const newQuantity = (item.quantity || 1) + change;
            if (newQuantity >= 1) {
               item.quantity = newQuantity;
            }
         }
      }
   }
})



export const { addProduct } = allItemSlice.actions
export const { addToBag, removeFromCart, updateQuantity } = bagItemSlice.actions