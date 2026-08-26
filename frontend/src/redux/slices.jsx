import { createSlice } from "@reduxjs/toolkit"

import p_img1 from "../assets/p_img1.png";
import p_img2_1 from "../assets/p_img2_1.png";
import p_img3 from "../assets/p_img3.png";
import BagItem from "../components/BagItem";
import {products} from '../assets/assets.js'
  import { toast } from "react-toastify";       

export const  bagItemSlice = createSlice({
   name:"bagItems",
   initialState : [{
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
      addToBag: (state,action) => {
         const item = action.payload
         const existingItem = state.find((cartItem)=>cartItem._id === item._id && cartItem.size === item.size);

         if(existingItem){
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
         }else{
            toast.success("Added to cart!");
            state.push({ ...item, quantity: item.quantity || 1 });
         }
      },
      removeFromCart : (state,action) => {
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



export const allItemSlice = createSlice({
   name:"allItems",
   initialState : products,
   reducers: {
      addProduct: (state,action) => {
         return [...state,action.payload]
      }
   }
})
export const {addProduct} = allItemSlice.actions
export const {addToBag,removeFromCart ,updateQuantity} = bagItemSlice.actions