const router = require('express').Router();
const Group = require('../models/Group');
const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Group.create(body)
    ));