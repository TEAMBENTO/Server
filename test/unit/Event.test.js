const { assert } = require('chai');
const { Types } = require('mongoose');
const { getErrors } = require('./helpers');
const Event = require('../../lib/models/Event');

describe('Event model', () => {

    it('valid good model', () => {
        const data = {
            name: 'PDX Monthly Run',
            description: 'Come get your run on!',
            type: 'running',
            location: {
                name: 'Spot',
                coords: {
                    lat: 45.25,
                    lng: -123.75
                }
            },
            time: {
                start: new Date(2018, 6, 22, 7, 30),
                end: new Date(2018, 6, 22, 8, 30)
            },
            host: [Types.ObjectId()],
            group: [Types.ObjectId()],
            attendance: [Types.ObjectId()]
        };

        const event = new Event(data);
        data._id = event._id;
        assert.deepEqual(event.toJSON(), data);
        assert.isUndefined(event.validateSync());
    });

    it('event required fields', () => {
        const event = new Event({ });
        const errors = getErrors(event.validateSync(), 5);

        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.description.kind, 'required');
        assert.equal(errors.type.kind, 'required');
        assert.equal(errors['location.name'].kind, 'required');
        assert.equal(errors['time.start'].kind, 'required');
        // assert.equal(errors.host.kind, 'required');
    });
});