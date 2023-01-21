import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Message from './components/Message';
import LoginForm from './components/loginform';
import BlogForm from './components/blogform';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  // const [formVisible, setFormVisible] = useState(false);

  // const [blogTitle, setBlogTitle] = useState('');
  // const [blogAuthor, setBlogAuthor] = useState('');
  // const [blogUrl, setBlogUrl] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        blogs.sort((a, b) => {
          return b.likes - a.likes;
        });
        setBlogs(blogs);
      });
  }, []);

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
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username: username,
        password: password
      };
      const userResponse = await loginService.submitLogin(credentials);
      window.localStorage.setItem('currentUser', JSON.stringify(userResponse));
      blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
      setUser(userResponse);
      setUsername('');
      setPassword('');
      setMessage(`Successfully logged in as ${userResponse.name}.`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      // console.log('successful login ', userResponse);
    } catch (exception) {
      setMessage('Login failed.\nIncorrect username or password.');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleBlogSubmission = async (blog) => {
    try {
      // event.preventDefault();
      blogFormRef.current.toggleVisible();
      // const blog = {
      //   name: blogTitle,
      //   author: blogAuthor,
      //   url: blogUrl
      // }
      blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
      const response = await blogService.submitBlog(blog);
      // console.log(response);
      setMessage(`Successfully added new blog "${blog.name}" by ${blog.author}.`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
      // setBlogAuthor('');
      // setBlogTitle('');
      // setBlogUrl('');
      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
    } catch (exception) {
      // CHANGE ERROR MESSAGE BANNER
      setMessage('Error submitting blog.');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleLikeSubmit = async (blog) => {
    try {
      const id = blog.id;
      blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
      const response = await blogService.update({ blog, id });
      const newBlogs = blogs.map(blog => (blog.id === id ? response : blog));
      setBlogs(newBlogs);
    } catch (exception) {
      console.log('Failed to update blog/likes');
    }
  };
  const handleDelete = async (id, blog) => {
    try {
      if (window.confirm(`Delete blog "${blog.name}" by ${blog.author}?`)) {
        blogService.setToken(JSON.parse(window.localStorage.getItem('currentUser')));
        await blogService.remove(id, user);
        // const response = blogService.remove(id, user);
        // const newBlogs = blogs.map(blog => (blog.id === id ? null : blog));
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setMessage('Successfully deleted blog.');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        return setBlogs(newBlogs);
      }
      setMessage('Aborting deletion.');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      console.log('Error while deleting blog.');
    }
  };

  const logOut = (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('currentUser');
      setUser(null);
      setMessage('Logged out successfully.');
      setTimeout(() => {
        setMessage('');
      }, 7000);
    } catch (exception) {
      setMessage('Log out error.');
      setTimeout(() => {
        setMessage('');
      }, 7000);
    }
  };

  if (user === null) {
    return (
      <>
        <Message text={message} />
        <LoginForm username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword} />
      </>
    );
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm
          handleBlogSubmission={handleBlogSubmission}
        />
      </div>
    );
  };

  return (
    <div>
      <Message text={message} />
      <h2>blogs</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>{user.name} is logged in.  <button onClick={logOut}>log out</button>
      </p>
      <div className='blogsView'>
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} handleLikeSubmit={handleLikeSubmit} handleDelete={handleDelete} user={user} showAll={showAll} />;
        }
        )}
      </div>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        {/* <Togglable ref={blogFormRef}> */}
        {blogForm()}
      </Togglable>
      <br />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Collapse All' : 'View All'}
      </button>
    </div>
  );
};

export default App;
