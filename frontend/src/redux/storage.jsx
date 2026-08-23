import { configureStore } from "@reduxjs/toolkit";
import { bagItemSlice } from "./slices";
import { allItemSlice } from "./slices";

export const store = configureStore({
  reducer: {
    bagItemSlice: bagItemSlice.reducer,
    allItemSlice: allItemSlice.reducer,
  },
});
