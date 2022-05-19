import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import todo from "../features/todo/toDoSlice";

const reducer = {
  auth,
  todo,
};

const store = configureStore({ reducer });

export default store;
