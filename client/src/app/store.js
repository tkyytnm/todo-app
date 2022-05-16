import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import user from "../features/user/userSlice";
import todo from "../features/todo/toDoSlice";

const reducer = {
  auth,
  user,
  todo,
};

const store = configureStore({ reducer });

export default store;
