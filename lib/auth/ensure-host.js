const Event = require('../models/Event');

module.exports = function() {
    return (req, res, next) => {

        const currentUser = JSON.stringify(req.user.id);
        console.log('USER!!!!', currentUser);
        Event.getDetailById(req.id)
            .then(event => {

                const hostId = JSON.stringify(event.host[0].userId._id);
                console.log('HOST!!!!', hostId);
                if(currentUser !== hostId) {
                    console.log('I WILL NOT DELETE!');
                    next({
                        status: 403,
                        error: 'not the same user'
                    });
                }
                else {
                    console.log('DELETE EVERYTHING!!!!');
                    next();
                }

            });
    };
};