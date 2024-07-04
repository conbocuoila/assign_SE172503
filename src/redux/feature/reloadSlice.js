import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
  name: "reload",
  initialState: { reload: false },
  reducers: {
    setReload: (state, actions) => {
      state.reload = actions.payload;
      return state
    },
  },
});
export const { setReload } = reloadSlice.actions;
export default reloadSlice.reducer;
