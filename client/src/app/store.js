import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import todo from "../features/todo/toDoSlice";
import common from "../common/commonSlice";
import { loadState, saveState } from "./sessionStorage";

const reducer = {
  auth,
  todo,
  common,
};

// load state from session storage.
const persistedState = loadState();

const store = configureStore({ reducer, preloadedState: persistedState });

store.subscribe(() => {
  // save state to session storage whenever an action is dispatched.
  saveState(store.getState());
});

export default store;
