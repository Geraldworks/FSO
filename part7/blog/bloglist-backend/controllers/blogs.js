const router = require("express").Router();
const Blog = require("../models/blog");
const userExtractor = require("../utils/middleware").userExtractor;

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  blog.likes = blog.likes | 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

router.post("/:id/comments", async (request, response) => {
  // userExtractor used but creds not used since anonymous
  const oldBlog = await Blog.findById(request.params.id);

  if (!oldBlog) {
    return response.status(204).end();
  }
  const newBlog = {
    title: oldBlog.title,
    author: oldBlog.author,
    url: oldBlog.url,
    likes: oldBlog.likes,
    comments: oldBlog.comments.concat(request.body.comment),
    user: oldBlog.user,
  };

  const blogFromDb = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  // returns the new set of comments
  response.json(blogFromDb);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== blog._id.toString()
  );

  await user.save();

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = router;
