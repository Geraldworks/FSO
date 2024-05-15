const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);

const bcrypt = require("bcrypt");

const User = require("../../models/user");

// read-only global variables
const username = "root";
const password = "password";

describe("when there is one user in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash });
    await user.save();
  });

  describe("an unregisted user", () => {
    test("cannot login with any credentials", async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "unregistered", password: "unregistered" })
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert(!result.body.token);
      assert(result.body.error.includes("invalid username or password"));
    });
  });

  describe("a registered user", () => {
    test("cannot login with a wrong username", async () => {
      const result = await api
        .post("/api/login")
        .send({ username: "hello", password })
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert(!result.body.token);
      assert(result.body.error.includes("invalid username or password"));
    });

    test("cannot login with a wrong password", async () => {
      const result = await api
        .post("/api/login")
        .send({ username, password: "hello" })
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert(!result.body.token);
      assert(result.body.error.includes("invalid username or password"));
    });

    test("successfully logins with correct credentials", async () => {
      const result = await api
        .post("/api/login")
        .send({ username, password })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert(result.body.token);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
