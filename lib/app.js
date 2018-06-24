const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./util/error-handler');
require('./models/register-plugins');


const event = require('./routes/events');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static('public'));

app.use('/api/events', event);

app.use(errorHandler());

module.exports = app;