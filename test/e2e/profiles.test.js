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

    let profile2 = {
        userId: {},
        activities: 'yoga',
        bio: 'this is me',
        demographic: 'Im a boop2',
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
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.deepEqual(body, {
                    ...profile1,
                    _id, __v
                });
                profile1 = body;
            });
    
    });

    it('saves or posts a profile', () => {
        profile2.userId = user1._id;
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile2)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.deepEqual(body, {
                    ...profile2,
                    _id, __v
                });
                profile2 = body;
            });
    
    });


    it('gets profile by id', () => {
        return request.get(`/api/profiles/${profile1._id}`)
            .set('Authoization', user1.token)    
            .then(({ body }) => {
                assert.equal(body.userId.name, user1.name);
            });
    });

    it('gets all profiles', () => {

        return request.get('/api/profiles/')
            .set('Authorization', user1.token)
            .then(({ body }) => {
                assert.deepEqual(body[1].userId.name, user1.name);
                assert.equal(body[1].activities, 'yoga');
            }); 
    });
});