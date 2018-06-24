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

    it('Generates Hash from Password', () => {
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    it('Compares Password to Hash', () => {
        assert.isOk(user.comparePassword(password));
    });

    it('Required Fields', () => {
        const user2 = new User({});
        const errors = getErrors(user2.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });

});