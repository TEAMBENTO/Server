const tokenService = require('./token-service');
const request = require('../../test/e2e/request');

module.exports = function(id) {
    return (req, res, next) => {
        const token = req.get('Token');

        
        const user = (tokenService.verify(token))._id;
        console.log('HERE', user);

        return request.get(`/api/profiles/${id}`)
            .then(({ body }) => {
                if(user !== body.userId._id) {
                    next({
                        status: 403,
                        error: 'not same user'
                    });
                } else {
                    return next();
                }
            });

    };
};