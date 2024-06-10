import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setTimedErrorNotif } from "./errorNotifReducer";
import { useNavigate } from "react-router-dom";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      blogService.setToken(user.token);
      return user;
    },

    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const checkForCredentials = () => {
  return (dispatch) => {
    const userCreds = window.localStorage.getItem("loggedBlogappUser");
    if (userCreds) {
      const user = JSON.parse(userCreds);
      dispatch(setUser(user));
    }
  };
};

export const login = (userCreds) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userCreds);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user));
      return user;
    } catch (exception) {
      dispatch(setTimedErrorNotif("wrong username or password"));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export default userSlice.reducer;
