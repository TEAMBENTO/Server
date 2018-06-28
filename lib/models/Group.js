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
        enum: ['basketball', 'yoga', 'running', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer']
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

const updateOptions = {
    new: true,
    runValidators: true
};

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

    updateOnlyMembers(id, body) {
        return this.findOneAndUpdate(
            { _id: id },
            {
                $set:
                {
                    members: body.members
                }
            },
            updateOptions
        );
    },

    removeById(id) {
        return this.findOneAndRemove({ _id: id });
    }
};

module.exports = mongoose.model('Group', schema);