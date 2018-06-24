const express = require('express');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./util/error-handler');
require('./models/register-plugins');

app.use(morgan('dev'));
app.use(express.json());

const auth = require('./routes/auth');
const profiles = require('./routes/profiles');


app.use('/api/auth', auth);
app.use('/api/profiles', profiles);

app.use(errorHandler());


module.exports = app;