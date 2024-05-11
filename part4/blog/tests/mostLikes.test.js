const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most likes", () => {

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
  test("when list has only one blog, retrieves that author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const answer = {
      author: "Edsger",
      likes: 5
    };

    assert.deepStrictEqual(result, answer);
  });

  const listWithEqualLikeCounts = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go",
      author: "Pdsger",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 19,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "Jude",
      author: "Gerald",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 19,
      __v: 0,
    },
  ];
  test("when list has blogs of equal total likes, retrieves the first encountered author", () => {
    const result = listHelper.mostLikes(listWithEqualLikeCounts);
    const answer = {
      author: "Pdsger",
      likes: 19
    };

    assert.deepStrictEqual(result, answer);
  });

  const listWithUnequalLikeCounts = [
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
    },
    {
      _id: "5a422aa71b54a676234d17f3",
      title: "Jude",
      author: "Edsger",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 10,
      __v: 0,
    },
  ];
  test("when list has blogs of unequal like counts, get the correct answer", () => {
    const result = listHelper.mostLikes(listWithUnequalLikeCounts);
    const answer = {
      author: "Gerald",
      likes: 19
    };

    assert.deepStrictEqual(result, answer);
  });
});
