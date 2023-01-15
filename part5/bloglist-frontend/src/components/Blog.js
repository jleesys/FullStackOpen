import { useState, useEffect  } from 'react';

const Blog = ({ blog, handleLikeSubmit, handleDelete, user, showAll }) => {
  const [blogVis, setBlogVis] = useState(showAll);
  // const blogUser = await blog.userame;

  useEffect(() => {
    console.log('does ', user.username, ' equal ', blog.user.username)
    setBlogVis(showAll);
  }, [showAll]);

  // useEffect(() => {
  //   console.log(blog.user.username);
  // }, [blog])

  const style = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleBlogVis = () => {
    setBlogVis(!blogVis);
  }

  const showVisible = { display: blogVis ? '' : 'none' };

  const createBlog = (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    // console.log(updatedBlog);
    handleLikeSubmit(updatedBlog);
  }

  const deleteBlog = (e) => {
    e.preventDefault();
    handleDelete(blog.id, blog);
  }

  // console.log(user, blog);

  return (
    <div style={style}>
      {blog.name} <button onClick={() => setBlogVis(!blogVis)}>{blogVis ? 'hide' : 'view'}</button>

      <div style={showVisible}>
        {blog.url} <br />
        {blog.likes} <button onClick={createBlog}>like</button> <br />
        {blog.author} <br />
        { user.username === blog.user.username ?
          <button style={{ backgroundColor: 'cyan' }} onClick={deleteBlog} >remove</button>
          : null
        }
      </div>

      {/* {blogVis ?
        <div>
          {blog.url} <br />
          {blog.likes} <button onClick={createBlog}>like</button> <br />
          {blog.author} <br />
          <button style={{backgroundColor: 'cyan'}} onClick={deleteBlog} >remove</button>
        </div>
        : <></>} */}
    </div>
  )
}

export default Blog