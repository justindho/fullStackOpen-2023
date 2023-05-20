import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const BlogForm = ({
  setBlogs,
  setMessageType,
  setMessage,
  blogs,
  blogFormRef
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessageType('success')
      setMessage(`Created a new blog: ${createdBlog.title}`)
    } catch (exception) {
      setMessageType('error')
      setMessage(`${exception.message}`)
    }

    setTimeout(() => {
      setMessageType(null)
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title: <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            id='title-input'
          />
        </div>
        <div>
          author: <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            id='author-input'
          />
        </div>
        <div>
          url: <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            id='url-input'
          />
        </div>
        <button type='submit' id='create-button'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func,
  setMessageType: PropTypes.func,
  setMessage: PropTypes.func,
  blogs: PropTypes.array,
  blogFormRef: PropTypes.object
}

export default BlogForm