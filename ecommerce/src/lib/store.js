import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
import authReducer from "./features/authSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export const store = makeStore();
