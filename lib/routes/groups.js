const router = require('express').Router();
const Group = require('../models/Group');
const { getParam, respond } = require('./route-helpers');
const createEnsureAuth = require('../auth/ensure-auth');
const createEnsureCaptain = require('../auth/ensure-captain');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(), respond(
        ({ body }) => Group.create(body)
    ))

    .get('/', respond(
        ({ query }) => Group.findByQuery(query)
    ))

    .get('/:id', createEnsureAuth(), respond(
        ({ id }) => Group.getDetailById(id)
    ))

    .put('/:id', createEnsureAuth(), createEnsureCaptain(), respond(
        ({ id, body }) => Group.updateById(id, body)
    ))

    .put('/:id/mem', createEnsureAuth(), respond(
        ({ id, body }) => Group.updateOnlyMembers(id, body)
    ))

    .delete('/:id', createEnsureAuth(), createEnsureCaptain(), respond(
        ({ id }) => Group.removeById(id)
            .then(deleted => {
                return { removed: !!deleted };
            })
    ))
;