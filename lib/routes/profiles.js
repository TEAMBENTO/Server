const router = require('express').Router();
const Profile = require('../models/Profile');
const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Profile.create(body) //sending the body
    ))
    .get('/:id', respond(
        ({ id }) => Profile.getDetailById(id)
    ))
    .get('/', respond (
        ({ query }) => Profile.findByQuery(query)
    ));


