import { useState } from 'react';

const BlogForm = ({
  handleBlogSubmission
  // blogTitle,
  // setBlogTitle,
  // blogAuthor,
  // setBlogAuthor,
  // blogUrl,
  // setBlogUrl
}) => {

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const createBlog = async (event) => {
    try {
      event.preventDefault();
      const blog = {
        name: blogTitle,
        author: blogAuthor,
        url: blogUrl
      };
      const response = await handleBlogSubmission(blog);
      setBlogAuthor('');
      setBlogTitle('');
      setBlogUrl('');
    } catch (exception) {
      console.log('Error adding blog. \n', exception);
    }
  };

  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={createBlog}>
        <div>
                    title <input name='blogTitle'
            value={blogTitle}
            placeholder='Blog Title'
            onChange={({ target }) => { setBlogTitle(target.value) }} />
        </div>
        <div>
                    author
          <input name='blogAuthor'
            value={blogAuthor}
            placeholder='Author'
            onChange={({ target }) => { setBlogAuthor(target.value) }}
          />
        </div>
        <div>
                    url
          <input name='blogUrl'
            placeholder='URL'
            value={blogUrl}
            onChange={({ target }) => { setBlogUrl(target.value) }}
          />
        </div>
        <button type='submit' name='submitBlog'>submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;