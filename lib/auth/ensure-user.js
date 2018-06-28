const tokenService = require('./token-service');
const request = require('../routes/route-helpers');
const Profile = require('../models/Profile');


module.exports = function() {
    return (req, res, next) => {
        // const token = req.get('Token');

        const currentUser = JSON.stringify(req.user.id);

        Profile.getDetailById(req.id)
            .then(profile => {

                const profileId = JSON.stringify(profile.userId._id);
                if(currentUser !== profileId) {
                    next({
                        status: 403,
                        error: 'not the same user'
                    });
                }
                else {
                    next();
                }

            });
    };
};