const { assert } = require('chai');
const Event = require('../../lib/models/Event');

describe('Event model', () => {

    it('vaild good model', () => {
        const data = {
            name: '',
            description: '',
            type: '',
            location: '',
            time: {
                start: '',
                end: ''
            },
            host: [''],
            attendance: ['']
        };

        const event = Event(data);
        data._id = event._id;
        assert.deepEqual(event.toJSON(), data);
        assert.isUndefined(event.validateSync());
    });
});