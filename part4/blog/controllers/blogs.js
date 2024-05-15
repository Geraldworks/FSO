const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  const newBlog = {
    ...body,
    user: user.id,
  };
  const blog = new Blog(newBlog);
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!(blog.user.toString() === user.id.toString())) {
    return response
      .status(403)
      .json({ error: "forbidden operation; you do not own this blog" });
  }

  await blog.deleteOne();
  user.blogs = user.blogs.filter(
    (userblog) => userblog.toString() !== blog.id.toString()
  );

  await user.save();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = { ...body };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
