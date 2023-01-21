/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
describe('blog app', function () {
    // initializes db by clearing out Users and Blogs
    // then creates first test user
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const initUser = {
            username: 'tester949',
            password: 'password',
            name: 'Tester 949'
        };
        cy.request('POST', 'http://localhost:3003/api/users', initUser);
        cy.visit('http://localhost:3000/');
    });

    describe('Front page', function () {
        it('front page can be opened', function () {
            // cy.visit('http://localhost:3000/');
            cy.contains('log in to application');
            // cy.get('#username').type('tester949');
            // cy.get('#password').type('can you see this lol').debug();
        });
        it('Login form is shown', function () {
            // cy.visit('http://localhost:3000');
            cy.contains('log in to application');
            cy.contains('username');
            cy.contains('password');
            cy.contains('#loginButton', 'log in');
        });
    })

    describe('Login', function () {
        it('Correct login shows appropriate green banner', function () {
            cy.get('#username').type('tester949');
            cy.get('#password').type('password');
            cy.contains('button', 'log in').click();

            cy.get('.successBanner').contains('Successfully logged in as');
            cy.get('.successBanner').should('have.css', 'color', 'rgb(0, 128, 0)');
            cy.contains('h2', 'blogs');
            cy.contains('p', 'is logged in');
        });
        it('Incorrect login shows appropriate red banner', function () {
            cy.get('#username').type('tester949');
            cy.get('#password').type('passwor');
            cy.contains('button', 'log in').click();

            cy.contains('.errorBanner', 'Login failed.').as('errorBanner');
            cy.get('@errorBanner').should('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });

    describe('Blogs', function () {
        beforeEach(function () {
            const userLogin = {
                username: 'tester949',
                password: 'password'
            };
            cy.request('POST', 'http://localhost:3003/api/login', userLogin)
                .then(function (response) {
                    localStorage.setItem('currentUser', JSON.stringify(response.body));
                    // console.log(localStorage.getItem('currentUser'));
                    // const json = JSON.parse(localStorage.getItem('currentUser'));
                    // console.log(json.token);
                })
                .then(function () {
                    const blog = {
                        name: 'TestBlog',
                        author: 'author',
                        url: 'url.com'
                    };
                    // cy.request('POST', 'http://localhost:3003/api/blogs', blog, headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('currentUser').token)}` });
                    cy.request({
                        method: 'POST',
                        url: 'http://localhost:3003/api/blogs',
                        headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}` },
                        body: blog
                        // headers: { 'Authorization': `bearer ${json.token}` }
                    });
                });
            // const blog = {
            //     name: 'TestBlog',
            //     author: 'author',
            //     url: 'url.com'
            // };
            // cy.request('POST', 'http://localhost:3003/api/blogs', blog, headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('currentUser').token)}` });
            // cy.request({
            //     method: 'POST',
            //     url: 'http://localhost:3003/api/blogs',
            //     // headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}` }
            //     headers: { 'Authorization': `bearer ${json.token}` }
            // });
            cy.visit('http://localhost:3000');
        });
        it('able to submit a blog', function () {
            cy.contains('add blog').click();
            cy.get('.titleField').type('Real Stuff');
            cy.get('.authorField').type('Real Author');
            cy.get('.urlField').type('realurl.blog');
            cy.contains('submit').click();

            cy.get('.blogsView').contains('Real Stuff');
        });
        it('able to submit two blogs', function () {
            cy.contains('add blog').click();
            cy.get('.titleField').type('Real Stuff');
            cy.get('.authorField').type('Real Author');
            cy.get('.urlField').type('realurl.blog');
            cy.contains('submit').click();

            cy.contains('add blog').click();
            cy.get('.titleField').type('Tidbits Tailor');
            cy.get('.authorField').type('Roger Tideswell');
            cy.get('.urlField').type('tidbits.org');
            cy.contains('submit').click();

            cy.get('.blogsView').contains('Real Stuff');
            cy.get('.blogsView').contains('Tidbits Tailor');
        });
        it('able to like a blog, counted correctly', function () {
            cy.contains('view').click();
            cy.contains('like').should('be.visible');
            for (let i = 0; i < 11; i++) {
                cy.contains('like').click();
                cy.wait(100);
            }

            cy.contains('.blogsView', '11');
        });
    });
});