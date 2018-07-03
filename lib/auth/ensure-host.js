const Event = require('../models/Event');

module.exports = function() {
    return (req, res, next) => {

        Event.findOne({
            _id: req.id,
            host: req.user.id
        })
            .count()
            .then(count => {

                if(count === 0) {
                    next({
                        status: 403,
                        error: 'user is not the host'
                    });
                }
                else {
                    next();
                }

            });
    };
};