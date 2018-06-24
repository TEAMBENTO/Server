const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./util/error-handler');
require('./models/register-plugins');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static('public'));

const users = require('./routes/users');
const auth = require('./routes/auth');


app.use('/users', users);
app.use('/api/auth', auth);

app.use(errorHandler());


module.exports = app;