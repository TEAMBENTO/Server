const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection } = require('./db');

describe.only('Event E2E API', () => {

    before(() => dropCollection('events'));
    before(() => dropCollection('users'));
    before(() => dropCollection('profiles'));

    let token = '';

    const startTime = new Date('June 30, 2018 09:00:00');
    const endTime = new Date('June 30, 2018 12:00:00');

    let race = {
        name: 'PDX Trail Run',
        description: 'A trail run in forest park.',
        type: 'running',
        location: 'Forest Park',
        time: {
            start: startTime.toJSON(),
            end: endTime.toJSON()
        },
        host: [],
        group: [],
        attendance: []
    };

    let theRock = {
        email: 'dwayne@therock.com',
        password: 'therock',
        name: 'Dwayne Johnson'
    };

    let dwayne = {
        userId: {},
        activities: 'basketball',
        bio: 'WWF and Acting',
        demographic: 'Stuff about the rock.',
        location: 'Los Angeles, CA',
        image: 'image link'
    };

    let squad = {
        captains: [],
        members: [],
        teamName: 'The Rock Squad',
        type: 'basketball',
        description: 'Play the sports!',
        private: false
    };

    before(() => {
        return request.post('/api/auth/signup')
            .send(theRock)
            .then(({ body }) => {
                theRock = body;
                token = body.token;
                dwayne.userId = body._id;
            });

    });

    before(() => {
        return request.post('/api/profiles')
            .send(dwayne)
            .then(({ body }) => {
                dwayne = body;
            });
    });

    before(() => {
        squad.captains = [dwayne._id];
        squad.members = [dwayne._id];

        return request.post('/api/groups')
            .send(squad)
            .then(({ body }) => {
                squad = body;
            });
    });

    it('posts an event', () => {
        race.host = [dwayne._id];
        return request.post('/api/events')
            .send(race)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    ...race,
                    _id,
                    __v
                });
                race = body;
            });
    });

    it('gets all events', () => {
        return request.get('/api/events')
            .then(({ body }) => {
                assert.deepEqual(body, [race]);
            });
    });
    
    it('updates an event by id', () => {
        race.group = [squad._id];
        race.attendance = [dwayne._id];
        
        return request.put(`/api/events/${race._id}`)
            .send(race)
            .then(({ body }) => {
                assert.deepEqual(body, race);
            });
    });
    
    it('gets event by id', () => {
        return request.get(`/api/events/${race._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, race);
            });
    });

    it('deletes an event by id', () => {
        return request.delete(`/api/events/${race._id}`)
            .then(() => {
                return request.get(`/api/events/${race._id}`);
            })
            .then(res => {
                assert.strictEqual(res.status, 404);
            });
    });

});