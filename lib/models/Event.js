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
    // time: {
    //     start: {
    //         type: Date,
    //         required: true
    //     },
    //     end: Date
    // },
    // host: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Profile',
    //     required: true
    // }],
    // group:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Group'
    // }],
    // attendance: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Profile'
    // }]
});

module.exports = mongoose.model('Event', schema);