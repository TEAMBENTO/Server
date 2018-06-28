const router = require('express').Router();
const Profile = require('../models/Profile');
const { getParam, respond } = require('./route-helpers');
const createEnsureAuth = require('../auth/ensure-auth');
// const createEnsureSameUser = require('../auth/ensure-user');

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

    .delete('/:id', createEnsureAuth(), (req, res, next) => {
        const currentUser = req.user.id;
        console.log('REQ ID', req.id);
        console.log('CURRENT USER', currentUser);
        return Profile.getDetailById(req.id)
            .then((body) => {
                console.log('BODY', body);
                console.log('BODY USERID', body.userId._id);
                console.log('CURRENT USER 2', currentUser);
                const bodyId = body.userId._id.toString();
                const userId = currentUser.toString();
                console.log('!!!!!!!!!!', bodyId);
                console.log('@@@@@@@@@@', userId);
                if(userId !== bodyId) {
                    console.log('HERE');
                    return next({
                        status: 403,
                        error: 'not same user' 
                    });
                } else if(bodyId === userId) {
                    console.log('HERE2');
                    console.log('BODY ID', body._id);
                    Profile.removeById(bodyId)
                        .then(deleted => {
                            return { removed: !!deleted };
                        }); 
                }  
            });
    });

    


// .delete('/:id', createEnsureAuth(), respond(
//     ({ id, user }) => {
//         const currentUser = user.id;
//         console.log('CURRENT USER', currentUser);
//         return Profile.getDetailById(id)
//             .then(({ body }) => {
//                 console.log('BODY', body);
//                 if(body.userId !== currentUser) {
//                     return {
//                         status: 403,
//                         error: 'not same user'
//                     };
//                 } return Profile.removeById(id)
//                     .then(deleted => {
//                         return { removed: !!deleted };
//                     });
//             });
//     }
// ));


