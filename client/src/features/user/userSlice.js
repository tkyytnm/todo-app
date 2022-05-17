import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await fetch("/api/user");
    return await response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: false,
    isRejected: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;
