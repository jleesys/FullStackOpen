const lodash = require('lodash');
const testBlogs = require('../tests/testblogs');
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
    const faveBlog = blogs.reduce((faveBlog, currBlog) => {
        if (currBlog.likes > faveBlog.likes) return currBlog;
        else return faveBlog;
    })
    return faveBlog;
}

const mostLikes = (blogs) => {
    const organizedByAuthor = lodash.groupBy(blogs, 'author');
    // console.log(organizedByAuthor);
    for (let auth in organizedByAuthor) {
        // console.log('Auth : ', organizedByAuthor[auth]);
        organizedByAuthor[auth] = organizedByAuthor[auth].reduce((totalLikes, blog) => {
            return totalLikes += blog.likes;
        }, 0)
    }
    // console.log(organizedByAuthor)
    const keys = Object.keys(organizedByAuthor);
    const mostLikedAuthor =
        keys.reduce(
            (mostLiked, blogger) => {
                return organizedByAuthor[blogger] > organizedByAuthor[mostLiked] ? blogger : mostLiked;
            }
        )

    const objToReturn = 
    {
        author: mostLikedAuthor,
        likes: organizedByAuthor[mostLikedAuthor]
    };
    // console.log(objToReturn)
    return objToReturn;
}

// find the most prolific blogger (blogger with greatest # blogs)
// using countBy method from lodash lib
const mostBlogs = (blogs) => {
    const countBy = lodash.countBy;
    const authorResults = countBy(blogs, 'author');
    // console.log(authorResults)
    const keys = Object.keys(authorResults);
    // console.log(keys);
    const mostProlificBlogger = keys.reduce(
        (prolBlogger, currentBlogger) => {
            // console.log(authorResults[prolBlogger]);
            // console.log(authorResults[currentBlogger]);
            return authorResults[currentBlogger] > authorResults[prolBlogger] ? currentBlogger : prolBlogger;
        }
    );
    return mostProlificBlogger;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };