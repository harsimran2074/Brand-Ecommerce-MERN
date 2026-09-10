import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// =====================================================
// FETCH PRODUCTS
// =====================================================
export const fetchProducts = createAsyncThunk(
   "allItems/fetchProducts",
   async (_, thunkAPI) => {
      try {
         const response = await axios.get(backendUrl + "/api/product/get");
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to fetch products"
         );
      }
   }
);

// =====================================================
// ADD TO CART
// =====================================================
export const addToCart = createAsyncThunk(
   "bagItems/addToCart",
   async ({ itemId, size }, thunkAPI) => {
      try {
         const token = localStorage.getItem("token");
         if (!token) {
            toast.error("Please login first");
            return thunkAPI.rejectWithValue("Please login first");
         }

         const response = await axios.post(
            backendUrl + "/api/cart/add",
            { itemId, size },
            { headers: { token } }
         );

         if (response.data.success) {
            toast.success(response.data.msg || "Added to cart!");

         } else {
            toast.error(response.data.message || response.data.msg || "Failed to add to cart");
         }
         return response.data;
      } catch (error) {
         toast.error(error.response?.data?.message || "Failed to add to cart");
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to add to cart"
         );
      }
   }
);

// =====================================================
// UPDATE CART
// =====================================================
export const updateCart = createAsyncThunk(
   "bagItems/updateCart",
   async ({ itemId, size, quantity }, thunkAPI) => {
      try {
         const token = localStorage.getItem("token");
         if (!token) {
            toast.error("Please login to update cart");
            return thunkAPI.rejectWithValue("Please login");
         }

         const response = await axios.post(
            backendUrl + "/api/cart/update",
            { itemId, size, quantity },
            { headers: { token } }
         );

         return response.data;
      } catch (error) {
         toast.error(error.response?.data?.message || "Failed to update cart");
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to update cart"
         );
      }
   }
);

// =====================================================
// REMOVE FROM CART
// =====================================================
export const removeFromCartAPI = createAsyncThunk(
   "bagItems/removeFromCart",
   async ({ itemId, size }, thunkAPI) => {
      try {
         const token = localStorage.getItem("token");
         if (!token) {
            toast.error("Please login to manage cart");
            return thunkAPI.rejectWithValue("Please login");
         }

         const response = await axios.post(
            backendUrl + "/api/cart/remove",
            { itemId, size },
            { headers: { token } }
         );

         if (response.data.success) {
            toast.success(response.data.msg || "Item removed from cart");
         }

         return response.data;
      } catch (error) {
         toast.error(error.response?.data?.message || "Failed to remove item");
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to remove item"
         );
      }
   }
);

// =====================================================
// GET CART
// =====================================================
export const getCart = createAsyncThunk(
   "bagItems/getCart",
   async (_, thunkAPI) => {
      try {
         const token = localStorage.getItem("token");
         if (!token) {
            return { success: true, cartData: {} };
         }

         const response = await axios.get(backendUrl + "/api/cart/get", {
            headers: { token },
         });

         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Failed to get cart"
         );
      }
   }
);

// =====================================================
// ALL ITEMS SLICE
// =====================================================
export const allItemSlice = createSlice({
   name: "allItems",
   initialState: {
      products: [],
      loading: true,
      error: null,
   },
   reducers: {
      addProduct: (state, action) => {
         state.products.push(action.payload);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload?.products)
               ? action.payload.products
               : [];
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});


// =====================================================
// calculate cart selector (Memoized)
// =====================================================
export const selectBagSummary = createSelector(
   [
      (state) => state.bagItemSlice?.cartData || {},
      (state) => state.allItemSlice?.products || []
   ],
   (cartData, products) => {
      let subtotal = 0;

      for (const itemId in cartData) {
         const product = products.find(
            (product) => product._id === itemId
         );

         if (!product) continue;

         const sizes = cartData[itemId];
         if (typeof sizes === "object" && sizes !== null) {
            for (const size in sizes) {
               const quantity = Number(sizes[size]) || 0;
               subtotal += (product.price || 0) * quantity;
            }
         }
      }

      const deliveryFee = subtotal === 0 ? 0 : (subtotal > 1000 ? 0 : 50);

      return {
         subtotal,
         deliveryFee,
         total: subtotal + deliveryFee
      };
   });

// =====================================================
// BAG ITEM SLICE
// =====================================================
export const bagItemSlice = createSlice({
   name: "bagItems",
   initialState: {
      cartData: {},
      loading: false,
      error: null,
   },
   reducers: {
      clearCart: (state) => {
         state.cartData = {};
      },
   },
   extraReducers: (builder) => {
      // ADD
      builder
         .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.cartData) {
               state.cartData = action.payload.cartData;
            }
         })
         .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

         });

      // UPDATE
      builder
         .addCase(updateCart.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateCart.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.cartData) {
               state.cartData = action.payload.cartData;
            }
         })
         .addCase(updateCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });

      // REMOVE
      builder
         .addCase(removeFromCartAPI.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(removeFromCartAPI.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.cartData) {
               state.cartData = action.payload.cartData;
            }
         })
         .addCase(removeFromCartAPI.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });

      // GET CART
      builder
         .addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartData = action.payload?.cartData || {};
         })
         .addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});



// =====================================================
// EXPORT ACTIONS
// =====================================================
export const { addProduct } = allItemSlice.actions;
export const { clearCart } = bagItemSlice.actions;