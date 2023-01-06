const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blogmodel');
const User = require('../models/user');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');

let returnedInitialBlogs = [];

// beforeAll(async () => {
//     const tokenObj = await api.post('/api/login')
//         .send({
//             username: 'tester949',
//             password: 'password'
//         });
// })

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    for (let blog of helper.initialBlogs) {
        const blogLoad = new Blog(blog);
        await blogLoad.save();
    }

    // fetches blogs again after intially posting 'initialBlogs'
    // this gives us access to the id prop

    const fetchedBlogs = await api.get('/api/blogs');
    returnedInitialBlogs = fetchedBlogs.body;


    // const createUserResponse = await api
    //     .post('/api/users')
    //     .send({
    //         username: 'tester949',
    //         password: 'password',
    //         name: 'Tester User'
    //     })
    //     .expect(201)


    // const userTokenObj = await api.post('/api/login')
    //     .send({
    //         username: 'tester949',
    //         password: 'password'
    //     })
    //     .expect(200);
    // // console.log(userTokenObj);
    // const authHeader = 'Bearer ' + userTokenObj.body.token;
    // console.log(authHeader);



    // SHOWS INITIAL BLOGS FOR DEBUG PURPOSES
    // console.log('initial blogs: \n', returnedInitialBlogs);

    // await Blog.deleteMany({});
    // let blogObject = new Blog(helper.initialBlogs[0]);
    // await blogObject.save();
    // blogObject = new Blog(helper.initialBlogs[1]);
    // await blogObject.save();
})

describe('deleting blogs', () => {
    test('delete a single specified blog', async () => {
        const idToDelete = returnedInitialBlogs[0].id;

        // console.log('initial blogs: \n:', returnedInitialBlogs);
        await api
            .delete(`/api/blogs/${idToDelete}`)
            .expect(204)

        // const endBlogs = await api.get('/api/blogs').body;
        const response = await api.get('/api/blogs');
        const endBlogs = response.body;
        // console.log('final blogs: \n', endBlogs);
        const endBlogsByName = endBlogs.map(blog => blog.name);

        expect(endBlogsByName).not.toContain('React patterns');
        expect(endBlogs).toHaveLength(1);
    })

    test('deleting blog with nonexistent id returns 400', async () => {
        // an id from an object in a prev initialization (these are randomized each time)
        const nonexistentID = '638d2f09dd2e0c152e274eb6';

        // for testing purposes
        // const existingID = returnedInitialBlogs[0].id;

        await api
            .delete(`/api/blogs/${nonexistentID}`)
            // .delete(`/api/blogs/${existingID}`)
            .expect(400);
        // .expect(204);
        const blogsAfter = await api.get('/api/blogs');

        expect(blogsAfter.body).toHaveLength(helper.initialBlogs.length);
        // console.log('after \n', blogsAfter.body);
    })
})

describe('updating blogs', () => {
    test('updating likes on a blog changes num likes, does not change list length', async () => {
        const idToUpdate = returnedInitialBlogs[0].id;
        const blogUpdater = {
            id: idToUpdate,
            likes: 99
        }

        await api
            .put(`/api/blogs/${idToUpdate}`)
            .send(blogUpdater)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const endBlogs = response.body;

        expect(endBlogs[0].likes).toBe(99);
        expect(endBlogs.length).toBe(returnedInitialBlogs.length);

        // for (let blog of endBlogs) {
        //     if (blog.id === idToUpdate) {

        //     }
        // }
    })

})

let authHeader;
let usernamePosting;
describe('Checking blogs db api', () => {

    beforeEach(async () => {
        await User.deleteMany({});
        const createUserResponse = await api
            .post('/api/users')
            .send({
                username: 'tester949',
                password: 'password',
                name: 'Tester User'
            })
            .expect(201)
        // console.log(createUserResponse.body);


        const userTokenObj = await api.post('/api/login')
            .send({
                username: 'tester949',
                password: 'password'
            })
            .expect(200);
        // console.log(userTokenObj);
        authHeader = 'Bearer ' + userTokenObj.body.token;
        usernamePosting = userTokenObj.body.username;

        // console.log(authHeader);
    })

    test('Cannot post a blog without webtoken', async () => {
        const blogToAdd = {
            name: 'addblog',
            author: 'authorhere',
            url: 'https://bloggly.com/',
            likes: 9
        }

        const response = await api
            .post('/api/blogs')
            // .set('Authorization', authHeader)
            .send(blogToAdd)
            .expect(401)
        
       expect(response.body.error).toBe('invalid or expired token');

    })

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

    test('able to add a blog and correct user assigned', async () => {
        const blogToAdd = {
            name: 'addblog',
            author: 'authorhere',
            url: 'https://bloggly.com/',
            likes: 9
        }

        const addedBlog = await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const userAdder = await User.findById(addedBlog.body.user);

        const response = await api.get('/api/blogs');
        const titles = response.body.map(blog => blog.name);
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
        expect(titles).toContain('addblog');
        expect(userAdder.username).toBe(usernamePosting);

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
            .set('Authorization', authHeader)
            .send(blogToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        // console.log(returnedBlog.body);
        expect(returnedBlog.body.likes).toBe(0);
    })

    test('api returns 400 if request is missing title or url', async () => {
        const blogToAdd1 = {
            author: 'authorhere',
            url: 'https://bloggly.com/',
        }
        const blogToAdd2 = {
            name: 'addblogshow0likes',
            author: 'authorhere',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(blogToAdd1)
            .expect(400)
        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(blogToAdd2)
            .expect(400)
    })
});


afterAll(() => {
    mongoose.connection.close();
});

// initial fetched blogs
// [
//     {
//       name: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       id: '638d2c78a5d601fbe626a32f'
//     },
//     {
//       name: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       id: '638d2c78a5d601fbe626a331'
//     }
//   ]