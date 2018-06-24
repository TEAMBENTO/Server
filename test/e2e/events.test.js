const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection } = require('./db');

describe('Event E2E API', () => {

    before(() => dropCollection('events'));

    let race = {
        name: 'PDX Trail Run',
        description: 'A trail run in forest park.',
        type: 'running',
        location: 'Forest Park',
        // time: {
        //     start: new Date('June 30, 2018 09:00:00'),
        //     end: new Date('June 30, 2018 12:00:00')
        // },
        // host: [Types.ObjectId()],
        // group: [Types.ObjectId()],
        // attendance: [Types.ObjectId()]
    };

    it('posts an event', () => {
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

    it('gets event by id', () => {
        return request.get(`/api/events/${race._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, race);
            });
    });

    it('updates an event by id', () => {
        race.name = 'Forest Park Trail Run';

        return request.put(`/api/events/${race._id}`)
            .send(race)
            .then(({ body }) => {
                assert.equal(body.name, race.name);
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