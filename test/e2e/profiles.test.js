const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
// const { verify } = require('../../lib/util/')

describe('Profile E2E Test', () => {

    before(() => dropCollection('profile'));
    before(() => dropCollection('users'));

    let user1 = {
        email: 'foo@bar.com',
        password: 'foobar',
        name: 'Mr. Foo Bar'
    };

    let profile1 = {
        activities: 'basketball',
        bio: 'this is me',
        demographic: 'Im a boop',
        location: 'Portland',
        image: 'image link'
    };

    before(() => {
        return request
            .post('/auth/signup')
            .send(user1)
            .then(({ body }) => {
                user1._id = verify(body.token).id;
                user1.token = body.token;
            });
    });

    before(() => {
        profile1.push(user1._id);
        return request.post('/api/profile')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                profile1 = body;
            });
    });

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    it('posts a profile to the db', () => {
        profile1.push(user1._id);
        return request.post('/api/profile')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...profile1,
                    _id, __v
                });
                profile1 = body;
            });


    });

    it('gets profile by id', () => {
        return request.get(`/api/profile/${profile1._id}`)
            .then(({ body }) => {
                assert.equal(body.)
            });
    });
});