const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Profile E2E Test', () => {

    before(() => dropCollection('users'));
    before(() => dropCollection('profiles'));
    before(() => dropCollection('groups'));
    before(() => dropCollection('events'));

    let user1 = {
        email: 'foo@bar.com',
        password: 'foobar',
        name: 'Mr. Foo Bar'
    };

    let user2 = {
        email: 'not@user.com',
        password: 'pleaseFail',
        name: 'Wrong User'
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

    let group1 = {
        captains: [],
        members: [],
        teamName: 'Sneaky Sneks',
        type: 'soccer',
        description: 'We are the sneaky sneks',
        private: false,
        image: 'Image'
    };

    const startTime = new Date('June 30, 2018 09:00:00');
    const endTime = new Date('June 30, 2018 12:00:00');

    let race = {
        name: 'PDX Trail Run',
        description: 'A trail run in forest park.',
        type: 'running',
        location: {
            name: 'Forest Park',
            coords: {
                lat: 45.25,
                lng: -125.75
            }
        },
        time: {
            start: startTime.toJSON(),
            end: endTime.toJSON()
        },
        host: [],
        group: [],
        attendance: []
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

    before(() => {
        return request
            .post('/api/auth/signup')
            .send(user2)
            .then(({ body }) => {
                user2 = body;
                user2.token = body.token;
            });
    });
    
    before(() => {
        return request.post('/api/groups')
            .set('Authorization', user1.token)
            .send(group1)
            .then(({ body }) => {
                group1 = body;
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

    it('posts an event', () => {
        race.host.push(profile1._id);
        return request.post('/api/events')
            .set('Authorization', user1.token)
            .send(race)
            .then(({ body }) => {
                race = body;
            });
    });


    it('gets profile1 by id', () => {
        group1.captains.push(profile1._id);
        group1.members.push(profile1._id);
        return request.put(`/api/groups/${group1._id}`)
            .set('Authorization', user1.token)
            .send(group1)
            .then(({ body }) => {
                group1 = body;
                return request.get(`/api/profiles/${profile1._id}`)
                    .set('Authorization', user1.token);
            })
            .then(({ body }) => {
                assert.equal(body.groups.length, 1);
            }); 
    });

    it('gets profile2 by id', () => {
        group1.captains.push(profile2._id);
        return request.put(`/api/groups/${group1._id}`)
            .set('Authorization', user1.token)
            .send(group1)
            .then(({ body }) => {
                group1 = body;
                return request.get(`/api/profiles/${profile2._id}`)
                    .set('Authorization', user1.token);
            })
            .then(({ body }) => {
                assert.equal(body.groups.length, 1);
            }); 
    });

    it('gets all profiles', () => {

        return request.get('/api/profiles/')
            .set('Authorization', user1.token)
            .then(({ body }) => {
                assert.deepEqual(body[1].userId.name, user1.name);
                assert.equal(body.length, 2);
            }); 
    });

    it('update a profile', () => {
        profile1.activities = 'yoga';
        return request.put(`/api/profiles/${profile1._id}`)
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                assert.deepEqual(body, profile1);
                return request.get(`/api/profiles/${profile1._id}`)
                    .set('Authorization', user1.token);
            })
            .then(({ body }) => {
                assert.equal(body.activities, profile1.activities);
            });
    });

    it('deletes a profile by id', () => {
        return request.delete(`/api/profiles/${profile2._id}`)
            .set('Authorization', user1.token)
            .then(() => {
                return request.get(`/api/profiles/${profile2._id}`)
                    .set('Authorization', user1.token);
            })
            .then(res => {
                assert.equal(res.status, 404);
            });

    });

    it('cannot delete another users profile', () => {
        return request.delete(`/api/profiles/${profile1._id}`)
            .set('Authorization', user2.token)
            .then(res => {
                assert.equal(res.status, 403);
                assert.equal(res.body.error, 'not the same user');
                return request.get(`/api/profiles/${profile1._id}`)
                    .set('Authorization', user1.token);
            })
            .then(res => {
                assert.equal(res.status, 200);
            });

    });
});