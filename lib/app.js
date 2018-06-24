const express = require('express');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./util/error-handler');
require('./models/register-plugins');

app.use(morgan('dev'));
app.use(express.json());

const auth = require('./routes/auth');


app.use('/api/auth', auth);

const profile = require('./routes/profiles');
app.use('/api/profile', profile);

app.use(errorHandler());


module.exports = app;