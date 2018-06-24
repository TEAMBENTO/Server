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

        return request.post('/api/groups')
            .send(group1)
            .then(({ body }) => {
                console.log(body);
            });

    });


});