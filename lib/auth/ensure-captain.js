const Group = require('../models/Group');

module.exports = function() {
    return (req, res, next) => {

        Group.findOne({
            _id: req.id,
            captains: req.user.id
        }).count()
            .then(count => {

                if(count === 0) {
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