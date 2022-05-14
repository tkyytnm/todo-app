import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";

const reducer = {
  auth,
};

const store = configureStore({ reducer });

export default store;
