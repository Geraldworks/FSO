import { configureStore } from "@reduxjs/toolkit";
import successNotifReducer from "./reducers/successNotifReducer";
import errorNotifReducer from "./reducers/errorNotifReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    success: successNotifReducer,
    error: errorNotifReducer,
  },
});

export default store;
