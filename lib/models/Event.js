const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    name: RequiredString,
    description: RequiredString,
    type: {
        ...RequiredString,
        enum: ['basketball', 'yoga', 'running', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer']
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


const updateOptions = {
    new: true,
    runValidators: true
};

schema.statics = {
  
    updateOnlyAttendance(id, body) {
        return this.findOneAndUpdate(id, body, updateOptions);
    },

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