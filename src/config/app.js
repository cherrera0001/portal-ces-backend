/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import appRoot from 'app-root-path';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

import debugRoute from '../middlewares/debug-route';
import routesV1 from '../controllers';
import rollbar from './rollbarConfig';
// import saveLogsApi from '../helpers/saveLogsApi';
import '../helpers/axiosInterceptors';

rollbar.log('Server Loaded!');
const { NODE_ENV } = process.env;
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
app.use(function(req, res, next) {
  const oldJson = res.json;
  req.requestId = mongoose.Types.ObjectId().toHexString();
  // const salesChannelApiKey = req.headers['x-api-key'];
  // saveLogsApi({
  //   url: req.url,
  //   method: req.method,
  //   requestBody: JSON.stringify({ ...req.body, ...req.headers }),
  //   salesChannelApiKey,
  //   requestId: req.requestId,
  // });
  // res.json = function(data) {
  //   saveLogsApi({
  //     url: req.url,
  //     method: req.method,
  //     responseBody: JSON.stringify(data),
  //     salesChannelApiKey,
  //     requestId: req.requestId,
  //   });
  //   oldJson.apply(res, arguments);
  // };
  next();
});
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use('/docs/code', express.static(`${appRoot.path}/codeDocs/`));
app.use('', debugRoute, controllersConfig.router);
if (NODE_ENV !== 'production') {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(controllersConfig.apiDoc, {
      customCss: `
  .swagger-ui .topbar { display: none }
  /*.swagger-ui .topbar .wrapper .topbar-wrapper a img { display: none }*/
  /*.swagger-ui .topbar .wrapper .topbar-wrapper a { background: url("https://www.amicar.cl/assets/amicar-logo-3a86de0dbc683a996ba480ca99ac15e4e92f1c860e4e80b4a2faf49109e6f04a.svg") no-repeat fixed center }*/
  `,
    }),
  );
}
export default app;
