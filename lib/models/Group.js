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
    private: RequiredBoolean
});

module.exports = mongoose.model('Group', schema);