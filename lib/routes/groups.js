const router = require('express').Router();
const Group = require('../models/Group');
const { getParam, respond } = require('./route-helpers');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Group.create(body)
    ))

    .get('/', respond(
        ({ query }) => Group.findByQuery(query)
    ))

    .get('/:id', respond(
        ({ id }) => Group.getDetailById(id)
    ))

    .put('/:id', respond(
        ({ id, body }) => Group.updateById(id, body)
    ))

    .delete('/:id', respond(
        ({ id }) => Group.removeById(id)
            .then(deleted => {
                return { removed: !!deleted };
            })
    ))
;