const listHelper = require('../utils/list_helper');
const listBlogs = require('./testblogs');

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ];
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    })
    test('when list has multiple blogs, return correct total', () => {
        const result = listHelper.totalLikes(listBlogs);
        expect(result).toBe(36);
    })
})

describe('favorite blog', () => {
    test('is correctly chosen', () => {
        const favoriteBlog = listHelper.favoriteBlog(listBlogs);
        const correctBlog = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        };
        expect(favoriteBlog).toEqual(correctBlog);
    }
    )
})

describe('most prolific blogger', () => {
    test('is correctly chosen', () => {
        const mostLikedAuthor = listHelper.mostBlogs(listBlogs);
        const correctAuthor = 'Robert C. Martin';
        expect(mostLikedAuthor).toBe(correctAuthor);
    })
})

describe('most liked blogger', () => {
    test('is correctly chosen', () => {
        const mostLikedBlogger = listHelper.mostLikes(listBlogs);
        expect(mostLikedBlogger).toBe('Edsger W. Dijkstra');
    })
})