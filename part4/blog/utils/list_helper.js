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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const counts = {}
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]
    if (!(blog.author in counts)) {
      counts[blog.author] = 0
    }
    counts[blog.author] += 1
  }

  let maxAuthor = null
  let maxBlogs = 0
  Object.keys(counts).forEach(author => {
    const numBlogs = counts[author]
    if (numBlogs > maxBlogs) {
      maxBlogs = numBlogs
      maxAuthor = author
    }
  })

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}