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
        // duplicate data with Event and Profile
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

const getPopulate = path => ({
    path,
    select: 'userId',
    populate: {
        path: 'userId',
        select: 'name'
    }
})

schema.statics = {

    findByQuery(query) {
        return this.find(query)
            .populate(getPopulate('captains'))
            .populate(getPopulate('members'))
            .lean()
            .select();
    },

    getDetailById(id) {
        return this.findById(id)
            .populate(getPopulate('captains'))
            .populate(getPopulate('members'))
            .lean()
            .select();
    },

    updateOnlyMembers(id, members) {
        return this.findOneAndUpdate(
            { _id: id },
            {
                $set: { members }
            },
            updateOptions
        );
    },

    removeById(id) {
        return this.findOneAndRemove({ _id: id });
    }
};

module.exports = mongoose.model('Group', schema);