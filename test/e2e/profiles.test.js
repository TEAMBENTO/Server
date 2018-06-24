const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { verify } = require('../../lib/auth/token-service');

describe('Profile E2E Test', () => {

    before(() => dropCollection('users'));
    before(() => dropCollection('profiles'));

    let user1 = {
        email: 'foo@bar.com',
        password: 'foobar',
        name: 'Mr. Foo Bar'
    };

    let profile1 = {
        userId: {},
        activities: 'basketball',
        bio: 'this is me',
        demographic: 'Im a boop',
        location: 'Portland',
        image: 'image link'
    };
    
    before(() => {
        return request
            .post('/api/auth/signup')
            .send(user1)
            .then(({ body }) => {
                user1 = body;
                user1.token = body.token;
            });
    });    

    it('saves or posts a profile', () => {
        profile1.userId = user1._id;
        console.log('this is user id', user1);
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                console.log(body);
                assert.ok(body._id);
                profile1 = body;
            });
    
    });

   

    it.skip('posts a profile to the db', () => {
        profile1.push(user1._id);
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile1)
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

    // it('gets profile by id', () => {
    //     return request.get(`/api/profile/${profile1._id}`)
    //         .then(({ body }) => {
    //             assert.equal(body.)
    //         });
    // });
});