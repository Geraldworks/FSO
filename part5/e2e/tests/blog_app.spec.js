const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "gerald",
        username: "gerald2",
        password: "password",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "gerad",
        username: "gerald",
        password: "password",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to Application")).toBeVisible();
    await expect(page.getByTestId("username")).not.toBeNull();
    await expect(page.getByTestId("password")).not.toBeNull();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "gerald", "password");
      await expect(page.getByText("gerad logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "gerald", "wrong");
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "gerald", "password");
      });

      test("a new blog can be created", async ({ page }) => {
        await createBlog(
          page,
          "test blog from playwright",
          "playwright",
          "playwright.com"
        );
        await expect(
          page.getByText("test blog from playwright playwright")
        ).toBeVisible();
      });

      test("a blog can be liked", async ({ page }) => {
        await createBlog(page, "testing", "playwright", "playwright.com");
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("a blog can be deleted", async ({ page }) => {
        await createBlog(page, "testing", "playwright", "playwright.com");
        await page.getByRole("button", { name: "view" }).click();
        page.on("dialog", async (dialog) => {
          await dialog.accept();
        });
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("testing playwright")).not.toBeVisible();
      });

      test("a blog cannot be deleted my non owners", async ({ page }) => {
        await createBlog(page, "testing", "playwright", "playwright.com");
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await loginWith(page, "gerald2", "password");
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("remove")).not.toBeVisible();
      });

      test("blogs are sorted in order of likes", async ({ page }) => {
        await createBlog(page, "testing1", "playwright", "playwright.com");
        await createBlog(page, "testing2", "playwright", "playwright.com");
        await page
          .locator("p")
          .filter({ hasText: "testing2 playwright view" })
          .getByRole("button")
          .click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
        await page
          .locator("p")
          .filter({ hasText: "testing1 playwright view" })
          .getByRole("button")
          .click();
        await expect(page.getByText("likes").first()).toHaveText(
          "likes 1 like"
        );
        await expect(page.getByText("likes").last()).toHaveText("likes 0 like");
      });
    });
  });
});
