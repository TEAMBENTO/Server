const router = require('express').Router();
const Profile = require('../models/Profile');
const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Profile.create(body) //sending the body
    ));