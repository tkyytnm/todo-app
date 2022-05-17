import { configureStore } from "@reduxjs/toolkit";
import user from "../features/user/userSlice";
import todo from "../features/todo/toDoSlice";

const reducer = {
  user,
  todo,
};

const store = configureStore({ reducer });

export default store;
