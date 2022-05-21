import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  registerUser,
  loginUser,
  logoutUser,
  updateVisibility,
  updateProfile,
  updatePassword,
  deleteUser,
} from "./authThunk";

const authSlice = createSlice({
  name: "auth",
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
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(updateVisibility.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateVisibility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateVisibility.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // To prevent overwriting the user object when an error message returns.
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(updatePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        // To prevent overwriting the user object when an error message returns.
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {};
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
  },
});

export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
