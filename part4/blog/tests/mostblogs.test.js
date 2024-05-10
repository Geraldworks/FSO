const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go',
      author: 'Edsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]
  test('when list has only one blog, retrieves that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const answer = {
      author: 'Edsger',
      blogs: 1
    }

    assert.deepStrictEqual(result, answer)
  })

  const listWithEqualBlogCounts = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go',
      author: 'Pdsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Jude',
      author: 'Gerald',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 19,
      __v: 0,
    },
  ]
  test('when list has equal blogs, retrieves the first encountered author', () => {
    const result = listHelper.mostBlogs(listWithEqualBlogCounts)
    const answer = {
      author: 'Pdsger',
      blogs: 1
    }

    assert.deepStrictEqual(result, answer)
  })

  const listWithUnequalBlogCounts = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go',
      author: 'Edsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Jude',
      author: 'Gerald',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 19,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d1745',
      title: 'Jude2',
      author: 'Gerald',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 19,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Jude',
      author: 'Gerald',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 19,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Jude',
      author: 'Edsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 19,
      __v: 0,
    },
  ]
  test('when list has unequal blog counts, get the correct answer', () => {
    const result = listHelper.mostBlogs(listWithUnequalBlogCounts)
    const answer = {
      author: 'Gerald',
      blogs: 3
    }

    assert.deepStrictEqual(result, answer)
  })
})
