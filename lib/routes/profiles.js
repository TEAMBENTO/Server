const router = require('express').Router();
const Profile = require('../models/Profile');
const { getParam, respond } = require('./route-helpers');
const createEnsureAuth = require('../auth/ensure-auth');
const createEnsureUser = require('../auth/ensure-user');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(), respond(
        ({ body }) => Profile.create(body) //sending the body
    ))
    .get('/:id', createEnsureAuth(), respond(
        ({ id }) => Profile.getDetailById(id)
    ))
    .get('/', createEnsureAuth(), respond (
        ({ query }) => Profile.findByQuery(query)
    ))
    .put('/:id', createEnsureAuth(), respond(
        ({ id, body, }) => Profile.updateById(id, body)
    ))
    .delete('/:id', createEnsureAuth(), createEnsureUser(), respond(
        ({ id }) => Profile.removeById(id)
            .then(deleted => {
                return { removed: !!deleted };
            })
    ));


