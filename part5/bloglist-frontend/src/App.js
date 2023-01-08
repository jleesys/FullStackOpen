import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

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
    } catch(exception) {
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
      console.log('error login');
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
          <button name='loginButton' type='submit'>log in</button>
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
    </div>
  )
}

export default App
