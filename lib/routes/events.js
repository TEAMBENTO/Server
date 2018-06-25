const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Event = require('../models/Event');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Event.create(body)
    ))
	
    .get('/', respond(
        ({ query }) => {
            return query 
                ? Event.find(query).lean().populate({
                    path: 'host',
                    select: 'userId image',
                    populate: {
                        path: 'userId',
                        select: 'name'
                    }
                })
                : Event.find().lean().populate({
                    path: 'host',
                    select: 'userId image',
                    populate: {
                        path: 'userId',
                        select: 'name'
                    }
                });
        }
    ))
	
    .get('/:id', respond(
        ({ id }) => {
            return Event.findById(id)
                .lean()
                .populate({
                    path: 'host',
                    select: 'userId image',
                    populate: {
                        path: 'userId',
                        select: 'name'
                    }
                });
        }
    ))

    .put('/:id', respond(
        ({ id, body }) => Event.updateById(id, body)
    ))

    .delete('/:id', respond(
        ({ id }) => Event.findByIdAndRemove(id)
    ));