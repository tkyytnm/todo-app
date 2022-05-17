import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

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
        state.user = {};
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
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
