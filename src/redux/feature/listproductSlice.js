import { createSlice } from "@reduxjs/toolkit";

const defaultValue = [];
const listproductSlice = createSlice({
  name: "listproduct",
  initialState: defaultValue,
  reducers: {
    add: (state, actions) => {
      const newLaptop = actions.payload;
      state.push(newLaptop);
      return state;
    },
    // setReload: (state, actions) => {
    //   state.reload = actions.payload;
    //   return state;
    // },
    clearAll: () => defaultValue,
  },
});
export const { add, clearAll } = listproductSlice.actions;
export default listproductSlice.reducer;
