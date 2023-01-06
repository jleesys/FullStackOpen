const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
})

describe('creating users', () => {
    test('creates a new user successfully', async () => {
        const userToAdd = {
            username: 'theTester',
            password: 'password',
            name: 'Joe'
        };
        const response = await api
            .post('/api/users')
            .send(userToAdd)
            .expect(201);

        const { username, name } = response.body;
        expect(username).toBe('theTester');
        expect(name).toBe('Joe');
    })
    test('creating user with username less than 3 chars fails', async () => {
        const userToAdd = {
            username: 'te',
            password: 'testpass1'
        };

        const response = await api
            .post('/api/users')
            .send(userToAdd)
            .expect(400);

        expect(response.body.error).toBe('username and password must be greater than 3 chars');
    })
    test('creating user with password less than 3 chars fails', async () => {
        const userToAdd = {
            username: 'testuser1',
            password: 'te'
        };

        const response = await api
            .post('/api/users')
            .send(userToAdd)
            .expect(400);

        expect(response.body.error).toBe('username and password must be greater than 3 chars');
    })
})

afterAll(() => {
    mongoose.connection.close();
});