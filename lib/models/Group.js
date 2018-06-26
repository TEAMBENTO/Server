const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredBoolean } = require('../util/mongoose-helpers');

const schema = new Schema({
    captains: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    type: {
        ...RequiredString,
        enum: ['basketball', 'soccer', 'running', 'football', 'hiking']
    },
    teamName: RequiredString,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    description: RequiredString,
    private: RequiredBoolean,
    image: RequiredString
});

schema.statics = {

    findByQuery(query) {
        return this.find(query)
            .populate({
                path: 'captains',
                select: 'userId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            })
            .populate({
                path: 'members',
                select: 'userId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            })
            .lean()
            .select();
    },

    getDetailById(id) {
        return this.findById(id)
            .populate({
                path: 'captains',
                select: 'userId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            })
            .populate({
                path: 'members',
                select: 'userId',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            })
            .lean()
            .select();
    },

    removeById(id) {
        return this.findOneAndRemove({ _id: id });
    }
};

module.exports = mongoose.model('Group', schema);