const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Event = require('../models/Event');
const createEnsureAuth = require('../auth/ensure-auth');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(), respond(
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

    .put('/:id', createEnsureAuth(), respond(
        ({ id, body }) => Event.updateById(id, body)
    ))

    .delete('/:id', createEnsureAuth(), respond(
        ({ id }) => Event.findByIdAndRemove(id)
    ));