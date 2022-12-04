const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blogmodel');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        const blogLoad = new Blog(blog);
        await blogLoad.save();
    }

    // await Blog.deleteMany({});
    // let blogObject = new Blog(helper.initialBlogs[0]);
    // await blogObject.save();
    // blogObject = new Blog(helper.initialBlogs[1]);
    // await blogObject.save();
})

describe('Checking blogs db api', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are fetched', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
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

    test('able to add a blog', async () => {
        const blogToAdd = {
            name: 'addblog',
            author: 'authorhere',
            url: 'https://bloggly.com/',
            likes: 9
        }

        await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const titles = response.body.map(blog => blog.name);
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
        expect(titles).toContain('addblog');

    })

    test('identifier `id` exists', async () => {
        const currentBlogs = await api.get('/api/blogs');
        const testBlog = currentBlogs.body[0];

        // console.log(testBlog);
        expect(testBlog.id).toBeDefined();
    })
    test('a blog submitted without likes defaults to 0 likes', async () => {
        const blogToAdd = {
            name: 'addblogshow0likes',
            author: 'authorhere',
            url: 'https://bloggly.com/',
        }

        const returnedBlog = await api
            .post('/api/blogs')
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        console.log(returnedBlog.body);
        expect(returnedBlog.body.likes).toBe(0); 
    })
});

// test('able to add and delete a blog', async () => {
//     const blogToAdd = {
//         name: 'thisisgoingtobegone',
//         author: 'nothing',
//         url: 'https://blank.com/',
//         likes: 0
//     }

//     const objAdded = await api
//         .post('/api/blogs')
//         .send(blogToAdd)
//         .expect(201)
//         .expect('Content-Type', /application\/json/);

//     await api
//         .delete(`/api/blogs/${objAdded.id}`)
//         .expect(204)

//     const finalListBlogs = await Blog.find({});
//     expect(finalListBlogs.length).toBe(helper.initialBlogs.length - 1);

// })

afterAll(() => {
    mongoose.connection.close();
});