const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    name: RequiredString,
    description: RequiredString,
    type: {
        ...RequiredString,
        enum: ['basketball', 'yoga', 'running']
    },
    location: RequiredString,
    time: {
        start: {
            type: Date,
            require: true
        },
        end: Date
    },
    host: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        require: true
    }],
    group:[{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    attendance: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }]
});

module.exports = mongoose.model('Event', schema);