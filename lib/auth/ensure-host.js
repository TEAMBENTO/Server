const Event = require('../models/Event');

module.exports = function() {
    return (req, res, next) => {

        const currentUser = JSON.stringify(req.user.id);
        Event.getDetailById(req.id)
            .then(event => {

                const hostId = JSON.stringify(event.host[0].userId._id);
                if(currentUser !== hostId) {
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