const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },        
    activities: {
        type: String,
        enum: ['basketball', 'yoga', 'running']
    },
    bio: String,
    
    demographic: {
        type: String,
    },
    location: String,
    image: String
});

module.exports = mongoose.model('Profile', schema);