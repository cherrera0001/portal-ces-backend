/* eslint-disable import/first */
const dotenv = require('dotenv');
const express = require('express');
const methodOverride = require('method-override');
const createError = require('http-errors');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const rollbar = require('./rollbarConfig');

rollbar.log('Server Loaded!');

const app = express();
app.use(rollbar.errorHandler());
app.use(methodOverride());
app.use(
  express.json({
    limit: '100mb',
  }),
);
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('', (req, res) => {
  res.json({
    message: 'Welcome to AMICAR Portal',
  });
});

app.use('/efidoc', require('../efidoc/routes'));

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

export default app;
