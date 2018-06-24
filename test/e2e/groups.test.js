const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('groups e2e', () => {

    before(() => dropCollection('users'));
    before(() => dropCollection('profiles'));
    before(() => dropCollection('groups'));
    
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
        activities: 'basketball',
        bio: 'this is me',
        demographic: 'Im a boop',
        location: 'Portland',
        image: 'image link'
    };

    let group1 = {
        captains: [],
        members: [],
        teamName: 'Sneaky Sneks',
        type: 'soccer',
        description: 'We are the sneaky sneks',
        private: false
    };

    let group2 = {
        captains: [],
        members: [],
        teamName: 'Not sneaky',
        type: 'soccer',
        description: 'We are the sneaky sneks',
        private: false
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
        profile1.userId = user1._id;
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile1)
            .then(({ body }) => {
                profile1 = body;
            });
    });

    before(() => {
        profile2.userId = user1._id;
        return request.post('/api/profiles')
            .set('Authorization', user1.token)
            .send(profile2)
            .then(({ body }) => {
                profile2 = body;
            });
    });

    it('creates a new group', () => {
        group1.captains.push(profile1._id);
        group1.members.push(profile1._id);

        return request.post('/api/groups')
            .send(group1)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.isOk(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, ...group1 });
                group1 = body;
            });
    });

    it('creates a second group', () => {
        group2.captains.push(profile1._id);
        group2.members.push(profile1._id);

        return request.post('/api/groups')
            .send(group2)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.isOk(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, ...group2 });
                group2 = body;
            });
    });

    
    it('gets all', () => {
        return request.get('/api/groups')
            .then(({ body }) => {
                assert.deepEqual(body, [group1, group2]);
            });
    });
    
    it('gets group by id', () => {
        return request.get(`/api/groups/${group1._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, group1);
            });
    });

    it('updates a group by id', () => {
        group1.members.push(profile2._id);
        return request.put(`/api/groups/${group1._id}`)
            .send(group1)
            .then(({ body }) => {
                assert.deepEqual(body, group1);
                return request.get(`/api/groups/${group1._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.members.length, 2);
            });
    });

    it('deletes a group by id', () => {
        return request.delete(`/api/groups/${group1._id}`)
            .then(() => {
                return request.get(`/api/groups/${group1._id}`)
            })
            .then(res => {
                assert.equal(res.status, 404);
            });
    });


});