const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const User = require('../models/User');
const createEnsureAuth = require('../auth/ensure-auth');

module.exports = router 

    .param('id', getParam)
    
    .get('/:id', createEnsureAuth(), respond(
        ({ id }) => User.getDetailById(id)
    ));