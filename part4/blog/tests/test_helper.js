const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
  {
    username: "gerad",
    name: "gerad",
    password: "password",
  },

  {
    username: "gerad2",
    name: "gerad2",
    password: "password",
  },
];

const generateInitialUsers = async () =>
  await Promise.all(
    initialUsers.map(async (user) => {
      return {
        username: user.username,
        name: user.name,
        passwordHash: await bcrypt.hash(user.password, 10),
      };
    })
  );

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  generateInitialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
