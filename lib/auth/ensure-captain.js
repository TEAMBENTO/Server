const Group = require('../models/Group');

module.exports = function() {
    return (req, res, next) => {

        const currentUser = JSON.stringify(req.user.id);
        Group.getDetailById(req.id)
            .then(group => {

                const captainId = JSON.stringify(group.captains[0].userId._id);
                if(currentUser !== captainId) {
                    next({
                        status: 403,
                        error: 'user is not a captain'
                    });
                }
                else {
                    next();
                }

            });
    };
};