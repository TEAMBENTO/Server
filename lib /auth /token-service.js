const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'steele-jeff-henry-steph';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles
        };
        return jwt.signAsync(payload, appSecret);
    },
    verify(token) {
        return jwt.verifyAsync(token, appSecret);
    }
};