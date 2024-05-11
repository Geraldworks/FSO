const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First Blog",
    author: "Harry",
    url: "https://www.firstblog.com",
    likes: 10,
  },
  {
    title: "Second Blog",
    author: "Jude",
    url: "https://www.secondblog.com",
    likes: 20,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
