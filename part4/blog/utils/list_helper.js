const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const best = blogs.reduce((prev, next) => prev.likes > next.likes ? prev : next)
    return { title: best.title, author: best.author, likes: best.likes }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
