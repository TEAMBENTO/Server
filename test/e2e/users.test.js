const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { verify } = require('../../lib/auth/token-service');

describe('User E2E', () => {

    before(() => dropCollection('users'));

    let user1 = {
        name: 'name1',
        email: 'name1@name1.com'
    };

    let user2 = {
        name: 'name2',
        email: 'name2@name2.com'
    };

    it('saves a new user', () => {

        return request
            .post('/auth/signup')
            .send(user1)
            .then(({ body }) => {
                user1._id = verify(body.token).id;
                user1.token = body.token;
            });

    });

});