import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/loginform';
import BlogForm from './components/blogform';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null);

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
      setMessage(`Successfully logged in as ${userResponse.name}.`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      // console.log('successful login ', userResponse);
    } catch (exception) {
      setMessage(`Login failed.\nIncorrect username or password.`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
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
      setMessage(`Successfully added new blog "${blog.name}" by ${blog.author}.`);
      setTimeout(() => {
        setMessage('');
      }, 7000);
      setBlogAuthor('');
      setBlogTitle('');
      setBlogUrl('');
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
    } catch (exception) {
      // CHANGE ERROR MESSAGE BANNER
      setMessage('Error submitting blog.');
      setTimeout(() => {
        setMessage('');
      }, 7000);
    }
  }

  const logOut = (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('currentUser');
      setUser(null);
      setMessage('Logged out successfully.');
      setTimeout(() => {
        setMessage('');
      }, 7000)
    } catch (exception) {

    }
  }

  if (user === null) {
    return (
      <>
        <Message text={message} />
        <LoginForm username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword} />
        {/* <h2>log in to application</h2>
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
        </form> */}
      </>
    )
  }

  return (
    <div>
      <Message text={message} />
      <h2>blogs</h2>
      <p>{user.name} is logged in.  <button onClick={logOut}>log out</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm
      handleBlogSubmission={handleBlogSubmission}
      blogTitle={blogTitle}
      setBlogTitle={setBlogTitle}
      blogAuthor={blogAuthor}
      setBlogAuthor={setBlogAuthor}
      blogUrl={blogUrl}
      setBlogUrl={setBlogUrl}
      />
      {/* <form onSubmit={handleBlogSubmission}>
        <div>
          title <input name='blogTitle'
            value={blogTitle}
            onChange={({ target }) => { setBlogTitle(target.value) }} />
        </div>
        <div>
          author
          <input name='blogAuthor'
            value={blogAuthor}
            onChange={({ target }) => { setBlogAuthor(target.value) }}
          />
        </div>
        <div>
          url
          <input name='blogUrl'
            value={blogUrl}
            onChange={({ target }) => { setBlogUrl(target.value) }}
          />
        </div>
        <button type='submit' name='submitBlog'>submit
        </button>
      </form> */}
    </div>
  )
}

export default App
