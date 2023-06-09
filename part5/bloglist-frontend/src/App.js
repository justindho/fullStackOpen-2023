import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification type={messageType} message={message} />

      {!user &&
        <Togglable buttonLabel='log in'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>
            {user.name} logged in
            <button type='submit' onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              setBlogs={setBlogs}
              setMessageType={setMessageType}
              setMessage={setMessage}
              blogs={blogs}
              blogFormRef={blogFormRef}
            />
          </Togglable>

          <ul>
            {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                like={() => like(blog)}
                canRemove={user && blog.user.username === user.username}
                remove={() => remove(blog)} />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App