const connect = require('../../lib/util/connect');
const mongoose = require('mongoose');


before(() => connect('mongodb://localhost:27017/event-meetup-test'));    
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};