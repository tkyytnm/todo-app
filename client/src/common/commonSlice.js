import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    hamOpen: false,
  },
  reducers: {
    switchHam(state) {
      state.hamOpen = !state.hamOpen;
    },
    closeHam(state) {
      state.hamOpen = false;
    },
  },
});

export const { switchHam, closeHam } = commonSlice.actions;
export default commonSlice.reducer;
export const selectHamOpen = (state) => state.common.hamOpen;
