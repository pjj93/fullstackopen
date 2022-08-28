import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = 'wrong username or password'
      const type = 'error'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      {notification !== null && <Notification notification={notification}/>}
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const addBlog = async (blogObject) => {
    
    try {
      const addedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      const message = `A new blog ${addedBlog.title} by ${addedBlog.author} added`
      const type = 'success'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      const message = 'Unable to add blog'
      const type = 'error'
      setNotification({ message, type })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    
  }

  const blogList = () => (
    <>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
  
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logout = () => (
    <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && 
        <div>
          <h2>blogs</h2>
          {notification !== null && <Notification notification={notification}/>}
          {logout()}
          {/* <BlogForm createBlog={addBlog} /> */}
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App