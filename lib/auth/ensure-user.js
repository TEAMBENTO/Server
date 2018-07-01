const Profile = require('../models/Profile');

module.exports = function() {
    return (req, res, next) => {

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