import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import user from "../features/user/userSlice";

const reducer = {
  auth,
  user,
};

const store = configureStore({ reducer });

export default store;
