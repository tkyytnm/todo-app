import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async () => {
    const response = await fetch("/api/user");
    return await response.json();
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
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

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

export const updateVisibility = createAsyncThunk(
  "auth/updateVisibility",
  async (data) => {
    const response = await fetch("/api/user/visibility", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data) => {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data) => {
    const response = await fetch("/api/user/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

export const deleteUser = createAsyncThunk("auth/deleteUser", async () => {
  const response = await fetch("/api/user", {
    method: "DELETE",
  });
  return await response.json();
});
