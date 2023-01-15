import { useState } from 'react';

const Blog = ({ blog, handleLikeSubmit }) => {
  const [blogVis, setBlogVis] = useState(false);

  const createBlog = (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    // console.log(updatedBlog);
    handleLikeSubmit(updatedBlog);
  }
  return (
    <div>
      {blog.name} || {blog.author} <button onClick={() => setBlogVis(!blogVis)}>{blogVis ? 'hide' : 'view'}</button>
      {blogVis ?
        <div>
          {blog.url} <br />
          {blog.likes} <button onClick={createBlog}>like</button> <br />
          {blog.author} <br />

        </div>
        : <></>}
    </div>
  )
}

export default Blog