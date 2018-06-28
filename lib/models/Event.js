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
    location: {
        name: RequiredString,
        coords: {
            lat: Number,
            lng: Number
        }
    },
    time: {
        start: {
            type: Date,
            required: true
        },
        end: Date
    },
    host: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
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

schema.statics = {

    getDetailById(id) {
        return this.findById(id)
            .lean()
            .populate({
                path: 'host',
                select: 'userId image',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            });
    },

    findByQuery(query) {
        return this.find(query)
            .lean()
            .populate({
                path: 'host',
                select: 'userId image',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            });
    }

};

module.exports = mongoose.model('Event', schema);