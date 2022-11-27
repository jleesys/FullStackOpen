const lodash = require('lodash');
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

// find the most prolific blogger (blogger with greatest # blogs)
// using countBy method from lodash lib
const mostBlogs = (blogs) => {
    const countBy = lodash.countBy;
    const authorResults = countBy(blogs, 'author');
    console.log(authorResults)
    let finalAuthor = Object.keys(authorResults)[0];
    for (let author in authorResults) {
        if (authorResults[author] > authorResults[finalAuthor]) finalAuthor = author;
    }
    return finalAuthor;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };