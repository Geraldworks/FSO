import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlogObject, config);
  return response.data;
};

const updateBlog = (blogId) => async (newBlogObject) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlogObject);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blogId}`, config);
};

const createComment = async (blogId, comment) => {
  // config added but not used since anonymous
  const config = {
    headers: { Authorization: token },
  };
  const commentObj = { comment };
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentObj,
    config
  );
  // returns the new set of comments
  return response.data;
};

export default {
  getAll,
  create,
  setToken,
  updateBlog,
  deleteBlog,
  createComment,
};
