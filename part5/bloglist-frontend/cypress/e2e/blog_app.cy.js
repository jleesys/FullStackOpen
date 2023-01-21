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

    describe('Blogs', { retries: { runMode: 2, openMode: 2 } }, function () {
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
            cy.visit('http://localhost:3000');
        });
        describe('blog submission', function () {
            it('able to submit a blog', function () {
                cy.contains('add blog').click();
                cy.get('.blogForm').should('be.visible');
                cy.get('.titleField').type('Real Stuff');
                cy.get('.authorField').type('Real Author');
                cy.get('.urlField').type('realurl.blog');
                cy.contains('submit').click();

                cy.get('.blogsView').contains('Real Stuff');
            });
            it('able to submit two blogs', function () {
                cy.contains('add blog').click();
                cy.get('.blogForm').should('be.visible');
                cy.get('.titleField').type('Real Stuff');
                cy.get('.authorField').type('Real Author');
                cy.get('.urlField').type('realurl.blog');
                cy.contains('submit').click();

                cy.contains('add blog').click();
                cy.get('.blogForm').should('be.visible');
                cy.get('.titleField').type('Tidbits Tailor');
                // cy.get('.titleField').should('have.value','Tidbits Tailor');
                cy.get('.authorField').type('Roger Tideswell');
                // cy.get('.authorField').should('have.value','Roger Tideswell');
                cy.get('.urlField').type('tidbits.org');
                // cy.get('.urlField').should('have.value', 'tidbits.org');
                cy.contains('submit').click();

                cy.get('.blogsView').contains('Real Stuff');
                cy.get('.blogsView').contains('Tidbits Tailor');
            });
        });
        describe('blog deletion', function() {
            beforeEach(function() {
                const secondUser = {
                    username: 'tester2',
                    name: 'tester 2',
                    password: 'password2'
                };
                cy.request('POST', 'http://localhost:3003/api/users', secondUser);
            });
            it('deletion button appears when viewing own added blog', function() {
                cy.contains('view').click();
                cy.contains('remove');
            });
            it('deletion button does not appear when checking as another user', function() {
                cy.contains('button', 'view').click();
                cy.get('.blogsView').contains('remove').should('be.visible');
                cy.contains('log out').click();
                // log in as secondary user (non owner)
                cy.request('POST', 'http://localhost:3003/api/login', { username: 'tester2', password: 'password2' })
                .then(function(response) {
                    localStorage.setItem('currentUser', JSON.stringify(response.body));
                    cy.visit('http://localhost:3000');
                });
                cy.contains('button', 'view').click();
                cy.get('.blogsView').should('not.contain', 'remove');
            });
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
        it.only('blogs appear in order of most liked, descending', function() {
                console.log(localStorage.getItem('currentUser'));
            cy.request({
                method: 'POST',
                url: 'http://localhost:3003/api/blogs',
                headers: { Authorization : `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}` },
                body: {
                    name: 'This should appear at the top',
                    author: 'Top Author',
                    url: 'firsturl.com',
                    likes: 99
                }
            });
            cy.request({
                method: 'POST',
                url: 'http://localhost:3003/api/blogs',
                headers: { Authorization : `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}` },
                body: {
                    name: 'This should appear at the bottom',
                    author: 'Bot Author',
                    url: 'boturl.com',
                    likes: 1
                }
            });
            cy.request({
                method: 'POST',
                url: 'http://localhost:3003/api/blogs',
                headers: { Authorization : `bearer ${JSON.parse(localStorage.getItem('currentUser')).token}` },
                body: {
                    name: 'This should appear in the middle',
                    author: 'Mid Author',
                    url: 'midurl.com',
                    likes: 8 
                }
            });
            cy.visit('http://localhost:3000');

            cy.get('.blog').eq(0).contains('appear at the top');
            cy.get('.blog').eq(1).contains('appear in the middle');
            cy.get('.blog').eq(2).contains('appear at the bottom');
        });
    });
});