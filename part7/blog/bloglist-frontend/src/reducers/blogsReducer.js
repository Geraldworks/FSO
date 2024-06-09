import { createSlice } from "@reduxjs/toolkit";
import { setTimedErrorNotif } from "./errorNotifReducer";
import { setTimedSuccessNotif } from "./successNotifReducer";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      const newBlog = action.payload;
      return state.concat(newBlog);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes);
    },
    likeBlogRedux(state, action) {
      const blogId = action.payload;
      const oldBlog = state.find((blog) => blog.id === blogId);
      const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
      const newBlogList = state
        .map((blog) => (blog.id === blogId ? newBlog : blog))
        .sort((a, b) => b.likes - a.likes);
      return newBlogList;
    },
    deleteBlogRedux(state, action) {
      const blogId = action.payload;
      return state.filter((blog) => blog.id !== blogId);
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  updateBlog,
  likeBlogRedux,
  deleteBlogRedux,
} = blogsSlice.actions;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlog = (newBlog, successMsg, errorMsg) => {
  return async (dispatch) => {
    try {
      const newBlogFromDb = await blogService.create(newBlog);
      dispatch(appendBlog(newBlogFromDb));
      dispatch(setTimedSuccessNotif(successMsg));
    } catch (exception) {
      dispatch(setTimedErrorNotif(errorMsg));
    }
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const oldBlog = blogs.find((blog) => blog.id === blogId);
    const updatedBlog = {
      title: oldBlog.title,
      author: oldBlog.author,
      url: oldBlog.url,
      likes: oldBlog.likes + 1,
      user: oldBlog.user.id,
    };
    const updatedBlogFromDb = await blogService.updateBlog(blogId)(updatedBlog);
    const blogToStore = {
      ...oldBlog,
      likes: updatedBlogFromDb.likes,
    };
    dispatch(updateBlog(blogToStore));
  };
};

export const deleteBlog = (blogId) => (successMsg, errorMsg) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId);
      dispatch(deleteBlogRedux(blogId));
      dispatch(setTimedSuccessNotif(successMsg));
    } catch (error) {
      dispatch(setTimedErrorNotif(errorMsg));
    }
  };
};

export default blogsSlice.reducer;
