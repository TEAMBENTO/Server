const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Event = require('../models/Event');
const createEnsureAuth = require('../auth/ensure-auth');
const createEnsureHost = require('../auth/ensure-host');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(), respond(
        ({ body }) => Event.create(body)
    ))
	
    .get('/', respond(
        ({ query }) => Event.findByQuery(query)
    ))

    .get('/:id', respond(
        ({ id }) => Event.getDetailById(id)
    ))

    .put('/:id', createEnsureAuth(), respond(
        ({ id, body }) => Event.updateById(id, body)
    ))

    .delete('/:id', createEnsureAuth(), createEnsureHost(), respond(
        ({ id }) => Event.findByIdAndRemove(id)
    ));