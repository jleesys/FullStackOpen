const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blogmodel');
const app = require('../app');
const api = supertest(app);

const initialBlogs = [
    {
        name: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        name: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
})

describe('Checking blogs db api', () => {
test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
})

test('the first blog is by Michael Chan', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].author).toBe('Michael Chan');
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const blogNames = response.body.map(r => r.name);
    expect(blogNames).toContain('React patterns');
})
});

afterAll(() => {
    mongoose.connection.close();
});