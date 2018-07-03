const mongoose = require('mongoose');
const { Schema } = mongoose;
const Group = require('./Group');
const Event = require('./Event');

const schema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },        
    activities: {
        type: String,
        // duplicate data with Event and Profile
        enum: ['basketball', 'yoga', 'running', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer']
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
        return Promise.all([
            this.findById(id)
                .populate({
                    path: 'userId',
                    select: 'name'
                })
                .lean(),

            Group.find({ captains: id })
                .lean()
                .select('teamName'),
            
            Event.find({ host: id })
                .lean()
                .select('name')
        ])
            .then(([profile, groups, events]) => {
                if(!profile) return null;
                profile.groups = groups;
                profile.events = events;
                return profile;
            });
    
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