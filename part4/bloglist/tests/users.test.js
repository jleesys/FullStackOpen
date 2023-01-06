const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const api = supertest(app);

const initialUsers = [
    {
        name: 'Joe Test',
        username: 'jtest',
        password: 'test1'
    },
    {
        name: 'Rob Test',
        username: 'rtest',
        password: 'test2'
    }
];

beforeAll( async () => {
    await User.deleteMany({});

    for (let user of initialUsers) {
        const userToAdd = new User(user); 
        await userToAdd.save();
    }
})

describe('adding users api', () => {
    test('all initial users are present', async () => {
        const dbInitialUsers = await User.find({});
        expect(dbInitialUsers.length).toBe(initialUsers.length);
        // expect(dbInitialUsers.length).toBe(2);
    })
    test('able to add new user', async () => {
        const dbInitialUsers = await User.find({});

        const userToAdd = {
            name: 'User To Add',
            username: 'utoadd',
            password: 'lollers'
        };

        const response = await (new User(userToAdd).save());
        const dbEndUsers = await User.find({});
        const usernames = dbEndUsers.map(u => u.username);

        expect(dbEndUsers.length).toBe(dbInitialUsers.length + 1);
        expect(usernames).toContain('utoadd');
    })

    test('cannot add username or password under 3 chars long', async () => {
        const dbInitialUsers = await User.find({});

        const userToAddUname = {
            name: 'should not show up',
            username: 'us',
            password: 'lollers'
        };
        const userToAddPass = {
            name: 'should not show up',
            username: 'username',
            password: 'p'
        };

        // const response1 = await new User(userToAddUname).save();
        // const response2 = await new User(userToAddPass).save();

        const responseUname = await api
            .post('/api/users')
            .send(userToAddUname)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const responsePass = await api
            .post('/api/users')
            .send(userToAddPass)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        // console.log(responseUname, '\n', responsePass);

        const dbEndUsers = await User.find({});
        const usernames = dbEndUsers.map(u => u.username);

        expect(dbEndUsers.length).toBe(dbInitialUsers.length);
        expect(usernames).not.toContain('should not show up');
        expect(responseUname.body.error).toBe('username and password must be greater than 3 chars');
        expect(responsePass.body.error).toBe('username and password must be greater than 3 chars');
        // console.log(dbEndUsers, '\n', usernames);
    })
})

afterAll(() => {
    mongoose.connection.close();
})