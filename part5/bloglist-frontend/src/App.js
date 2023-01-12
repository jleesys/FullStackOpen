import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import LoginForm from './components/loginform';
import BlogForm from './components/blogform';
import Togglable from './components/Togglable';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  // const [message, setMessage] = useState(null);
  // const [formVisible, setFormVisible] = useState(false);

  // const [blogTitle, setBlogTitle] = useState('');
  // const [blogAuthor, setBlogAuthor] = useState('');
  // const [blogUrl, setBlogUrl] = useState('');

  const blogFormRef = useRef();
  const messageRef = useRef();

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
      console.log('submitting login')
      const userResponse = await loginService.submitLogin(credentials);
      // console.log(userResponse)
      window.localStorage.setItem('currentUser', JSON.stringify(userResponse));
      setUser(userResponse);
      setUsername('');
      setPassword('');
      // setMessage(`Successfully logged in as ${userResponse.name}.`);
      messageRef.current.setMessageText(`Successfully logged in as ${user.name}.`)
      setTimeout(() => {
        // setMessage('');
        messageRef.current.setMessageText('');
      }, 5000);
      // console.log('successful login ', userResponse);
    } catch (exception) {
      // setMessage(`Login failed.\nIncorrect username or password.`);
      messageRef.current.setMessageText(`Login failed.\nIncorrect username or password.`);
      setTimeout(() => {
        // setMessage('');
        messageRef.current.setMessageText('');
      }, 5000);
    }
  }

  const handleBlogSubmission = async (blog) => {
    // event.preventDefault();
    try {
      blogFormRef.current.toggleVisible();
      blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
      const response = await blogService.submitBlog(blog);
      // console.log('setting message');
      // setMessage(`Successfully added new blog "${blog.name}" by ${blog.author}.`);
      messageRef.current.setMessageText(`Successfully added new blog "${blog.name}" by ${blog.author}.`);
      setTimeout(() => {
        // setMessage('');
        messageRef.current.setMessageText('');
      }, 5000);
      const newBlogs = blogs.concat(response);
      console.log('SETTING BLOGS')
      setBlogs(newBlogs);
    } catch (exception) {
      // CHANGE ERROR MESSAGE BANNER
      // setMessage('Error submitting blog.');
      messageRef.current.setMessageText('Error submitting blog.');
      setTimeout(() => {
        // setMessage('');
        messageRef.current.setMessageText('');
      }, 5000);
    }
  }

  const logOut = (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('currentUser');
      setUser(null);
      // setMessage('Logged out successfully.');
      messageRef.current.setMessageText('Logged out successfully.');
      setTimeout(() => {
        // setMessage('');
        messageRef.current.setMessageText('');
      }, 7000)
    } catch (exception) {

    }
  }

  if (user === null) {
    return (
      <>
        {/* <Message text={message} /> */}
        <Message ref={messageRef} />
        <LoginForm username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword} />
      </>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm
          handleBlogSubmission={handleBlogSubmission}
        />
      </div>
    )
  }

  return (
    <div>
      <Message text={messageRef} ref={messageRef} />
      <h2>blogs</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>{user.name} is logged in.  <button onClick={logOut}>log out</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        {blogForm()}
      </Togglable>
    </div>
  )
}

export default App
