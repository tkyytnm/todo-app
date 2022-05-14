import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendUserData = createAsyncThunk(
  "auth/sendUserData",
  async (data) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: false,
    isRejected: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(sendUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
  },
});

export default authSlice.reducer;
