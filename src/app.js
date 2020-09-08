const dotenv = require('dotenv');
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const parseSubscriptions = require('middlewares/parseSubscriptions.middleware');
const saveLogsApi = require('helpers/saveLogsApi');

dotenv.config();

const rollbar = require('./rollbar');

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
app.use(function(req, res, next) {
  const oldJson = res.json;
  req.requestId = mongoose.Types.ObjectId().toHexString();
  saveLogsApi({
    url: req.url,
    method: req.method,
    requestBody: { ...req.body, ...req.headers },
    requestId: req.requestId,
  });
  res.json = function(data) {
    saveLogsApi({
      url: req.url,
      method: req.method,
      responseBody: data,
      requestId: req.requestId,
    });
    oldJson.apply(res, arguments);
  };
  next();
});
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(parseSubscriptions);

app.get('', (req, res) => {
  res.json({
    message: 'Welcome to AMICAR',
  });
});

app.use('', require('routes'));
app.use('/amices/chl/v1', require('amices/routes'));
app.use('/eficar/chl/v1', require('eficar/routes'));

module.exports = app;
