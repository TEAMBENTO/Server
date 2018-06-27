module.exports = function() {
    return (req, res, next) => {
        if(req.body.user !== req.user.id && req.params.userId !== req.user.id) {
            next({
                status: 403,
                error: 'Must be the same U'
            });
        }
        else next();
    };
};