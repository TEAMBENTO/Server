const { assert } = require('chai');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {

    const data = {
        name: 'name',
        email: 'name@name.com'
    };

    const password = 'foo';

    let user = null; 

    beforeEach(() => {
        user = new User(data);
        user.generateHash(password);
    });

    it('valid good model', () => {
        data._id = user._id;
        data.hash = user.hash;
        assert.deepEqual(data, user.toJSON());
    });

});