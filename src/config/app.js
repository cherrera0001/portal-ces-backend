/* eslint-disable import/first */
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const appRoot = require('app-root-path');

dotenv.config();

const rollbar = require('./rollbarConfig');

rollbar.log('Server Loaded!');

const app = express();
app.use(rollbar.errorHandler());
app.use(methodOverride());
app.use(
  bodyParser.json({
    limit: '100mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use('/docs/code', express.static(`${appRoot.path}/codeDocs/`));

export default app;
