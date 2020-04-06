/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import appRoot from 'app-root-path';

dotenv.config();

import debugRoute from '../middlewares/debug-route';
import routesV1 from '../controllers';
import rollbar from './rollbarConfig';

rollbar.log('Server Loaded!');

const app = express();
const controllersConfig = routesV1({ rollbar });
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
app.use('', debugRoute, controllersConfig.router);

export default app;
