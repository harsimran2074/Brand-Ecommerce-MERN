import { configureStore } from "@reduxjs/toolkit";
import {bagItemSlice} from "./slices"
export const dataStore  = configureStore({
   reducer: { bagItemSlice : bagItemSlice.reducer }
})