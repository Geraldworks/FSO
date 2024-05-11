const { test, after, beforeEach } = require("node:test");
const Blog = require("../models/blog");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const { update } = require("lodash");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("there are two blogs", async () => {
  const response = await helper.blogsInDb();

  assert.strictEqual(response.length, helper.initialBlogs.length);
});

test("the unique identifier of a blog is id", async () => {
  const response = await api.get("/api/blogs");
  const firstBlog = response.body[0];

  assert("id" in firstBlog);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Admin",
    url: "https://www.adminblog.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => blog.title);
  assert(contents.includes("Test Blog"));
});

test("a blog without likes field is automatically set to 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Admin",
    url: "https://www.adminblog.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.find((blog) => blog.title === "Test Blog");
  assert("likes" in addedBlog);
  assert(addedBlog.likes === 0);
});

test("a blog without a title results in an error", async () => {
  const newBlog = {
    author: "Admin",
    url: "https://www.adminblog.com",
    likes: 9,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a blog without a url results in an error", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Admin",
    likes: 9,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a valid existing blog can be deleted successfully", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const firstBlog = blogsAtStart[0];

  await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(!titles.includes(firstBlog.title));

  // deleting the same resource gets a 204 response
  await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);
});

test("deleting a blog that does not exist results in error", async () => {
  await api.delete(`/api/blogs/${"AEaeje91903485"}`).expect(400);
});

test("a blog can be updated successfully", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const blogToUpdateId = blogToUpdate.id;
  const updatedBlog = { ...blogToUpdate, likes: 100 };

  await api.put(`/api/blogs/${blogToUpdateId}`).send(updatedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlogFromDb = blogsAtEnd.find(
    (blog) => blog.id === blogToUpdateId
  );

  assert.strictEqual(updatedBlogFromDb.likes, updatedBlog.likes);
});

after(async () => {
  await mongoose.connection.close();
});
