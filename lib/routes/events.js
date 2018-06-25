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
                ? Event.find(query).lean().populate('host group attendance')
                : Event.find().lean().populate('host group attendance');
        }
    ))
	
    .get('/:id', respond(
        ({ id }) => {
            return Event.findById(id)
                .lean()
                .populate('host group attendance');
        }
    ))

    .put('/:id', respond(
        ({ id, body }) => {
            return Event.updateById(id, body);
        }
    ))

    .delete('/:id', respond(
        ({ id }) => {
            return Event.findByIdAndRemove(id);
        }
    ));