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

schema.statics = {

    getDetailById(id) {
        return this.findById(id)
            .populate({
                path: 'userId',
                select: 'name'
            })
            .lean();    
    },

    findByQuery(query) {
        return this.find(query)
            .populate({
                path: 'userId',
                select: 'name'
            })
            .lean();
    },
    removeById(id) {
        return this.findOneAndRemove({
            _id: id
        });
    },

};

module.exports = mongoose.model('Profile', schema);