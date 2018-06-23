const { assert } = require('chai');
const { Types } = require('mongoose');
const Event = require('../../lib/models/Event');

describe('Event model', () => {

    it('vaild good model', () => {
        const data = {
            name: 'PDX Monthly Run',
            description: 'Come get your run on!',
            type: ['running'],
            location: 'Portland, OR',
            time: {
                start: new Date(2018, 6, 22, 7, 30),
                end: new Date(2018, 6, 22, 8, 30)
            },
            host: [Types.ObjectId()],
            group: [Types.ObjectId()],
            attendance: [Types.ObjectId()]
        };

        const event = Event(data);
        data._id = event._id;
        assert.deepEqual(event.toJSON(), data);
        assert.isUndefined(event.validateSync());
    });
});