const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Profile = require('./Profile');
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    name: RequiredString,
    email: RequiredString,
    hash: RequiredString
});

schema.method('generateHash', function(password) {
    this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password) {
    return bcrypt.compareSync(password, this.hash);
});

schema.statics = {

    getDetailById(id) {
        return Promise.all([
            this.findById(id)
                .lean()
                .select('name email'),
                
            Profile.find({ userId: id })
                .lean()
                .select('_id')
        ])
            .then(([user, profile]) => {
                if(!user) return null;
                user.profile = profile;
                return user;
            });
    
    }

};

module.exports = mongoose.model('User', schema);