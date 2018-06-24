const router = require('express').Router();
const User = require('../models/User');
const { getParam, respond } = require('./route-helpers');

module.exports = router 

    .param('id', getParam)
    
    .get('/:id', respond(
        ({ id }) => User.getDetailById(id)
    ));