const { assert } = require('chai');
const { Types } = require('mongoose');
// const { getErrors } = require('./helpers');
const Profile = require('../../lib/models/Profile');

describe('Profile Model', () => {

    it('valid good model', () => {
        const data = {
            userId: Types.ObjectId(),
            activities: 'basketball',
            bio: 'I like basketball',
            location: 'Portland',
            image: 'image-path'
        };
        
        const profile = new Profile(data);
        data._id = profile._id;
        assert.deepEqual(profile.toJSON(), data);
        assert.isUndefined(profile.validateSync());
    });
});