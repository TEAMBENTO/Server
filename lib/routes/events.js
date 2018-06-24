const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Event = require('../models/Event');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => {
            return Event.create(body);
        }
    ))
	
    .get('/', respond(
        ({ query }) => {
            return query 
                ? Event.find(query).lean().select('host, group, attendance')
                : Event.find().lean().select('host, group, attendance');
        }
    ))
	
    .get('/:id', respond(
        ({ id }) => {
            return Event.findById(id)
                .lean()
                .select('host, group, attendance');
        }
    ));