const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection } = request('./db');

describe('Event E2E API', () => {

    before(() => dropCollection('events'));

    let race = {
        name: 'PDX Trail Run',
        description: 'A trail run in forest park.',
        type: 'running',
        location: 'Forest Park',
        host: [Types.ObjectId()],
        group: [Types.ObjectId()],
        attendance: [Types.ObjectId()]
    };




});