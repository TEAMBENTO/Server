const { assert } = require('chai');
const { Types } = require('mongoose');
const { getErrors } = require('./helpers');
const Group = require('../../lib/models/Group');

describe('Group model', () => {

    it('valid good model', () => {
        const data = {
            captains: [Types.ObjectId()],
            type: 'soccer',
            teamName: 'Flying Mongooses',
            members: [Types.ObjectId()],
            description: 'A lovely bunch bunch of Mongooses who want to have fun',
            private: true,
            image: 'this is an image'
        };
        const group = new Group(data);
        data._id = group._id;
        assert.deepEqual(group.toJSON(), data);
        assert.isUndefined(group.validateSync());
    });

    it('group has required fields', () => {
        const group = new Group({});
        const errors = getErrors(group.validateSync(), 5);

        assert.equal(errors.teamName.kind, 'required');
        assert.equal(errors.description.kind, 'required');
        assert.equal(errors.private.kind, 'required');
        assert.equal(errors.type.kind, 'required');
        assert.equal(errors.image.kind, 'required');
    });


});