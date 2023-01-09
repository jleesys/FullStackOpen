const BlogForm = ({
    handleBlogSubmission,
    blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogUrl,
    setBlogUrl
}) => {

    return (
        <div>
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
            </form>
        </div>
    )
}

export default BlogForm;