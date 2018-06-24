const router = require('express').Router();
const { respond } = require('./route-helpers');
const Event = require('../models/Event');

module.exports = router

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
    ));