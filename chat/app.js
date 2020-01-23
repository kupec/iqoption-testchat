const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const {URL} = require('url');

const app = express();

app.use(logger('chat'));
app.use(
    bodyParser.json({
        limit: '50mb',
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: '50mb',
    })
);
app.use(cookieParser());
app.use(cors());

const mainRouter = require('./src/presentation/http/__router__');
const route404 = require('./src/presentation/http/__404__');
const route500 = require('./src/presentation/http/__500__');

mainRouter(app);
app.use(route404);
app.use(route500);

module.exports = app;
