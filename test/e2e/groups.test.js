const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('groups e2e', () => {

    before(() => dropCollection('groups'));

    let group1 = {
        teamName: 'Sneaky Sneks',
        type: 'soccer',
        description: 'We are the sneaky sneks',
        private: false
    };

    it('creates a new group', () => {
        group1.captains = [];
        group1.members = [];

        return request.post('/api/groups')
            .send(group1)
            .then(({ body }) => {
                const { _id, __v } = body;
                console.log(body);
                assert.isOk(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, ...group1 });
            });

    });


});