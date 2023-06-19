import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginSlice";
import postsReducer from "./Reducers/postsSlice";
import addNewPostReducer from "./Reducers/addNewPostSlice";

const reducer = combineReducers({
  loginState: loginReducer,
  postsState: postsReducer,
  createPostState: addNewPostReducer
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
