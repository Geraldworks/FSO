const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);

const helper = require("../test_helper");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

describe("when there is one user in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password123", 10);
    const user = new User({ username: "root", name: "root", passwordHash });

    await user.save();
  });

  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const users = await api.get("/api/users");

    assert.strictEqual(users.body.length, 1);
  });

  test("user creation succeeds with valid input", async () => {
    const usersAtStart = await helper.usersInDb();

    const userBody = {
      username: "root2",
      name: "valid",
      password: "strongpassword",
    };

    await api
      .post("/api/users")
      .send(userBody)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(userBody.username));
  });

  test("user creation fails with a non unique username", async () => {
    const usersAtStart = await helper.usersInDb();

    const userBody = {
      username: "root",
      name: "random",
      password: "123password",
    };

    const result = await api
      .post("/api/users")
      .send(userBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user creation fails with a short username", async () => {
    const usersAtStart = await helper.usersInDb();

    const userBody = {
      username: "hi",
      name: "random",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(userBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        "Path `username` (`hi`) is shorter than the minimum allowed length (3)."
      )
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user creation fails with a short password", async () => {
    const usersAtStart = await helper.usersInDb();

    const userBody = {
      username: "hello",
      name: "random",
      password: "hi",
    };

    const result = await api
      .post("/api/users")
      .send(userBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        "password needs to be at least 3 characters long"
      )
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
