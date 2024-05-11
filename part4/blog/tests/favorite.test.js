const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favourite blog", () => {
  const emptyList = [];
  test("of empty list is nothing", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(emptyList), {});
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go",
      author: "Edsger",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, retrieves that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const answer = {
      title: "Go",
      author: "Edsger",
      likes: 5
    };
    assert.deepStrictEqual(result, answer);
  });

  const listWithMoreThanOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go",
      author: "Edsger",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "Jude",
      author: "Gerald",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 19,
      __v: 0,
    }
  ];
  test("when list has more than one blog, retrieves the best blog", () => {
    const result = listHelper.favoriteBlog(listWithMoreThanOneBlog);
    const answer = {
      title: "Jude",
      author: "Gerald",
      likes: 19
    };
    assert.deepStrictEqual(result, answer);
  });
});