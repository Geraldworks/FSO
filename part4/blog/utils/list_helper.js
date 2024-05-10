const lodash = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const best = blogs.reduce((prev, next) =>
      prev.likes > next.likes ? prev : next
    )
    return { title: best.title, author: best.author, likes: best.likes }
  }
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, 'author')
  const countsByAuthor = lodash.mapValues(
    groupedByAuthor,
    (group) => group.length
  )
  const maxCount = lodash.max(Object.values(countsByAuthor))
  const authorWithMaxCount = Object.keys(countsByAuthor).find(
    (author) => countsByAuthor[author] === maxCount
  )
  return {
    author: authorWithMaxCount,
    blogs: maxCount,
  }
}

const mostLikes = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, 'author')
  const likesByAuthor = lodash.mapValues(
    groupedByAuthor,
    (group) => group.reduce((a, b) => a + b.likes, 0)
  )
  const maxCount = lodash.max(Object.values(likesByAuthor))
  const authorwithMaxCount = Object.keys(likesByAuthor).find(
    (author) => likesByAuthor[author] === maxCount
  )

  return {
    author: authorwithMaxCount,
    likes: maxCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
