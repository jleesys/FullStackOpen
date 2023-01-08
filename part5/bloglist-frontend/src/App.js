import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    try {
      const loggedUser = localStorage.getItem('currentUser');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser));
        // set token
      }
    } catch (exception) {
      console.log('no logged user found');
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username: username,
        password: password
      }
      const userResponse = await loginService.submitLogin(credentials);
      window.localStorage.setItem('currentUser', JSON.stringify(userResponse));
      setUser(userResponse);
      setUsername('');
      setPassword('');
      console.log('successful login ', userResponse);
    } catch (exception) {
      // CHANGE ERROR MESSAGE BANNER
      console.log('error login');
    }
  }

  const handleBlogSubmission = async (event) => {
    event.preventDefault();
    try {
      const blog = {
        name: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
      const response = await blogService.submitBlog(blog);
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
    } catch (exception) {
      // CHANGE ERROR MESSAGE BANNER
      console.log('submission error', exception)
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input placeholder='username'
              name='Username'
              value={username}
              onChange={({ target }) => { setUsername(target.value) }}></input>
          </div>
          <div>
            password
            <input placeholder='password'
              type='password'
              name='Password'
              value={password}
              onChange={({ target }) => { setPassword(target.value) }}></input>
          </div>
          <button name='sendLogin' type='submit'>log in</button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in.</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>add blog</h2>
      <form onSubmit={handleBlogSubmission}>
        <div>
          title <input name='blogTitle'
            value={blogTitle}
            onChange={({ target }) => { setBlogTitle(target.value) }} />
        </div>
        <div>
          author
          <input name='blogAuthor'
            onChange={({ target }) => { setBlogAuthor(target.value) }}
          />
        </div>
        <div>
          url
          <input name='blogUrl'
            onChange={({ target }) => { setBlogUrl(target.value) }}
          />
        </div>
        <button type='submit' name='submitBlog'>submit
        </button>
      </form>
    </div>
  )
}

export default App
