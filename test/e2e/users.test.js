const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('users e2e tests', () => {

    before(() => dropCollection('users'));
    before(() => dropCollection('profiles'));

    let user1 = {
        email: 'dwayne@therock.com',
        password: 'therock',
        name: 'Dwayne Johnson'
    };

    let profile1 = {
        userId: {},
        activities: 'basketball',
        bio: 'WWF and Acting',
        demographic: 'Stuff about the rock.',
        location: 'Los Angeles, CA',
        image: 'image link'
    };

    let token = null; // eslint-disable-line

    before(() => {
        return request.post('/api/auth/signup')
            .send(user1)
            .then(({ body }) => {
                user1 = body;
                token = body.token;
                profile1.userId = body._id;
            });

    });

    before(() => {
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                profile1 = body;
            });
    });

    

    it('gets a user by id', () => {
        return request.get(`/api/users/${user1._id}`)
            .set('Authorization', user1.token)
            .then(({ body }) => {
                assert.equal(body.profile[0]._id, profile1._id);
            });
    });

});