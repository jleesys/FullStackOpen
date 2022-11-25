// test func for testing purpose
const dummy = (blogs) => {
    return 1;
}

// gleans the total num likes from an array of blogs
const totalLikes = (blogs) => {
    const total = blogs.reduce((runningTotal, blog) => {
        return runningTotal += blog.likes;
    }, 0);
    return total;
}

const favoriteBlog = (blogs) => {
    // let faveBlog = blogs[0];
    // for (let i = 0; i < blogs.length; i++) {
    //     if (blogs[i].likes > faveBlog.likes) {
    //         faveBlog = blogs[i];
    //     }
    // }

    const faveBlog = blogs.reduce((faveBlog, currBlog) => {
        if (currBlog.likes > faveBlog.likes) return currBlog;
        else return faveBlog;
    })
    return faveBlog;
}

module.exports = { dummy, totalLikes, favoriteBlog };