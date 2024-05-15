const { test, after, beforeEach, describe } = require("node:test");
const jwt = require("jsonwebtoken");
const Blog = require("../../models/blog");
const User = require("../../models/user");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("../test_helper");
const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

let userOneToken;
let userTwoToken;

describe("when there are two users in the database", () => {
  beforeEach(async () => {
    // clear the database
    await Blog.deleteMany({});
    await User.deleteMany({});

    // create two users
    const initialUsers = await helper.generateInitialUsers();
    const dbInitialUsers = await User.insertMany(initialUsers);
    const firstUser = dbInitialUsers[0];

    // set the user for each blog to the first user
    const blogObjects = helper.initialBlogs.map((blog) => {
      return {
        ...blog,
        user: firstUser._id,
      };
    });
    const dbInitialBlogs = await Blog.insertMany(blogObjects);

    // add the blog records to the first user
    firstUser.blogs = dbInitialBlogs.map((blog) => blog._id);
    await firstUser.save();

    userOneToken = jwt.sign(
      {
        username: firstUser.username,
        id: firstUser._id,
      },
      process.env.SECRET
    );

    userTwoToken = jwt.sign(
      {
        username: dbInitialUsers[1].username,
        id: dbInitialUsers[1]._id,
      },
      process.env.SECRET
    );
  });

  describe("retrieving blogs", () => {
    test("succeeds with original number of blogs", async () => {
      const response = await helper.blogsInDb();
      assert.strictEqual(response.length, helper.initialBlogs.length);
    });

    test("succeeds for a user that is logged in", async () => {
      const response = await api
        .get("/api/blogs")
        .set("Authorization", `Bearer ${userOneToken}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });
  });

  describe("deleting blogs by a user", () => {
    test("fails if no token is provided", async () => {
      const initialBlogs = await helper.blogsInDb();
      const blogToDelete = initialBlogs[0];

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findById(userCreds.id);
      const blogsAfter = await helper.blogsInDb();

      assert(result.body.error.includes("token invalid"));
      assert.strictEqual(blogsAfter.length, initialBlogs.length);
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length);
    });

    test("fails if the user does not own the blog", async () => {
      const initialBlogs = await helper.blogsInDb();
      const blogToDelete = initialBlogs[0];

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${userTwoToken}`)
        .expect(403)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findById(userCreds.id);
      const blogsAfter = await helper.blogsInDb();

      assert(
        result.body.error.includes(
          "forbidden operation; you do not own this blog"
        )
      );
      assert.strictEqual(blogsAfter.length, initialBlogs.length);
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length);
    });

    test("fails if the blog does not exist", async () => {
      const initialBlogs = await helper.blogsInDb();

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      const result = await api
        .delete("/api/blogs/somethingrandom")
        .set("Authorization", `Bearer ${userTwoToken}`)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findById(userCreds.id);
      const blogsAfter = await helper.blogsInDb();

      assert(result.body.error.includes("malformatted id"));
      assert.strictEqual(blogsAfter.length, initialBlogs.length);
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length);
    });
    test("succeeds if the user owns the blogs", async () => {
      const initialBlogs = await helper.blogsInDb();
      const blogToDelete = initialBlogs[0];

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${userOneToken}`)
        .expect(204);

      const userAfter = await User.findById(userCreds.id);
      const blogsAfter = await helper.blogsInDb();
      const userAfterBlogStrings = userAfter.blogs.map((blog) =>
        blog.toString()
      );

      assert.strictEqual(blogsAfter.length, initialBlogs.length - 1);
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length - 1);
      assert(!userAfterBlogStrings.includes(blogToDelete.id));
    });
  });

  describe("adding a blog by a user", () => {
    test("fails when the blog has no title", async () => {
      const newBlog = {
        author: "Admin",
        url: "https://www.adminblog.com",
        likes: 9,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userOneToken}`)
        .send(newBlog)
        .expect(400);

      const blogsAfter = await helper.blogsInDb();
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length);
    });

    test("fails when the blog has no url", async () => {
      const newBlog = {
        title: "Gerad is so smerrt",
        author: "Admin",
        likes: 9,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userOneToken}`)
        .send(newBlog)
        .expect(400);

      const blogsAfter = await helper.blogsInDb();
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length);
    });

    test("fails when no token is provided", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Admin",
        url: "https://www.adminblog.com",
        likes: 9,
      };

      const result = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert(result.body.error.includes("token invalid"));
    });

    test("succeeds when likes field is not given and set to 0", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Admin",
        url: "https://www.adminblog.com",
      };

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      const result = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userOneToken}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findById(userCreds.id);
      const userAfterBlogStrings = userAfter.blogs.map((blog) =>
        blog.toString()
      );

      const allBlogs = await helper.blogsInDb();
      assert.strictEqual(allBlogs.length, helper.initialBlogs.length + 1);
      assert(userAfterBlogStrings.includes(result.body.id));
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length + 1);
      assert.strictEqual(result.body.likes, 0);
    });

    test("succeeds when all fields are given", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Admin",
        url: "https://www.adminblog.com",
        likes: 10,
      };

      const userCreds = jwt.verify(userOneToken, process.env.SECRET);
      const userBefore = await User.findById(userCreds.id);

      const result = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userOneToken}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const userAfter = await User.findById(userCreds.id);
      const userAfterBlogStrings = userAfter.blogs.map((blog) =>
        blog.toString()
      );

      const allBlogs = await helper.blogsInDb();
      assert.strictEqual(allBlogs.length, helper.initialBlogs.length + 1);
      assert(userAfterBlogStrings.includes(result.body.id));
      assert.strictEqual(userAfter.blogs.length, userBefore.blogs.length + 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
