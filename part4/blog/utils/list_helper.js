const Blog = require('../models/blog')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let maxBlog = null
  let maxLikes = 0
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxBlog = new Blog(blog).toJSON()
      maxLikes = blog.likes
    }
  })
  console.log(maxBlog)
  return maxBlog
}

module.exports = {
  totalLikes,
  favoriteBlog
}