const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { verify } = require('../../lib/auth/token-service');

describe('User E2E', () => {

    before(() => dropCollection('users'));

    let user1 = {
        name: 'name1',
        email: 'name1@name1.com',
        password: '1'
    };

    let user2 = {
        name: 'name2',
        email: 'name2@name2.com',
        password: '2'
    };

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(user1)
            .then(({ body }) => token = body.token);
    });

    it('signup', () => {
        assert.ok(token);
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'name1@name1.com',
                password: '1'
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    it('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send(user1)
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'Email exists');
            });
    });

    it('Gives 401 on non-existent email', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'bad@sue.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });

    it('Gives 401 on bad password', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'rober@ebert.com',
                password: 'bad'
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });

});