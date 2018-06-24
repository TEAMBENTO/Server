const Router = require('express').Router;
const router = Router();
const User = require('../models/User');
const { respond } = require('./route-helpers');
const { sign } = require('../auth/token-service');
const createEnsureAuth = require('../auth/ensure-auth');

const hasEmailAndPassword = ({ body }, res, next) => {
    const { email, password } = body;
    if(!email || !password) {
        throw {
            status: 401,
            error: 'Email and password required'
        };
    }
    next();
};

const hasNameEmailAndPassword = ({ body }, res, next) => {
    const { name, email, password } = body;
    if(!name || !email || !password) {
        throw {
            status: 401,
            error: 'Email, name, and password required'
        };
    }
    next();
};

module.exports = router
    .get('/verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasNameEmailAndPassword, respond(
        ({ body }) => {
            const { name, email, password } = body;
            delete body.password;

            return User.exists({ name, email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'Email exists'
                        };
                    }

                    const user = new User(body);
                    user.generateHash(password);
                    return user.save();
                })
                .then(user => {
                    return Promise.all([user, sign(user)]);
                })
                .then(([user, token]) => {
                    return {
                        token: token,
                        _id: user._id,
                        name: user.name
                    };
                });
        }
    ))

    .post('/signin', hasEmailAndPassword, respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;

            return User.findOne({ email })
                .then(user => {
                    if(!user || !user.comparePassword(password)) {
                        throw {
                            status: 401,
                            error: 'Invalid email or password'
                        };
                    }
                    return Promise.all([user, sign(user)]);
                })
                .then(([user, token]) => {
                    return {
                        token: token,
                        _id: user._id,
                        name: user.name
                    };
                });
        }
    ));