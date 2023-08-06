//store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducer";

const store = configureStore({
  reducer: {
    post: postReducer
  }
});

export default store;
