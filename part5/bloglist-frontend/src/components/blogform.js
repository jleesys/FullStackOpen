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
      await handleBlogSubmission(blog);
      // const response = await handleBlogSubmission(blog);
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
      <form className='blogForm' onSubmit={createBlog}>
        <div>
                    title <input className='titleField'
            name='blogTitle'
            value={blogTitle}
            placeholder='Blog Title'
            onChange={({ target }) => { setBlogTitle(target.value) }} />
        </div>
        <div>
                    author
          <input className='authorField'
            name='blogAuthor'
            value={blogAuthor}
            placeholder='Author'
            onChange={({ target }) => { setBlogAuthor(target.value) }}
          />
        </div>
        <div>
                    url
          <input className='urlField'
            name='blogUrl'
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