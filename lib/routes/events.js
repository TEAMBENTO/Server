const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Event = require('../models/Event');
const ensureAuth = require('../auth/ensure-auth')();
const ensureHost = require('../auth/ensure-host')();


module.exports = router

    .param('id', getParam)

    .post('/', ensureAuth, respond(
        ({ body }) => Event.create(body)
    ))
	
    .get('/', respond(
        ({ query }) => Event.findByQuery(query)
    ))

    .get('/:id', respond(
        ({ id }) => Event.getDetailById(id)
    ))

    .put('/:id', ensureAuth, ensureHost, respond(
        ({ id, body }) => Event.updateById(id, body)
    ))


    .put('/:id/att', ensureAuth, respond(
        ({ id, body: { attendance } }) => Event.updateOnlyAttendance(id, attendance)
    ))


    .delete('/:id', ensureAuth, createEnsureHost(), respond(
        ({ id }) => Event.findByIdAndRemove(id)
    ));