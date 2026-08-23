import { createSlice } from "@reduxjs/toolkit"

import p_img1 from "../assets/p_img1.png";
import p_img2_1 from "../assets/p_img2_1.png";
import p_img3 from "../assets/p_img3.png";
import BagItem from "../components/BagItem";
import {products} from '../assets/assets.js'
  

export const  bagItemSlice = createSlice({
   name:"bagItems",
   initialState : [],
   reducers: {
      addToBag: (state,action) => {
         state.map((item)=> { if(item._id !== action.payload._id){

         }})
         return [...state,action.payload]
      },
      removeFromCart : (state,action) => {
         return state.filter((item)=> (item._id !== action.payload))
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
export const {addToBag,removeFromCart} = bagItemSlice.actions