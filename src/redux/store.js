import { configureStore } from "@reduxjs/toolkit";
import listproductSlice from "./feature/listproductSlice";
import reloadSlice from "./feature/reloadSlice";

export const store = configureStore({
  reducer: {
    listproduct: listproductSlice,
    reload: reloadSlice
  },
});
