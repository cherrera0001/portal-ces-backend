/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
import appRoot from 'app-root-path';
import express from 'express';
import fs from 'fs';

import rollbar from '../config/rollbarConfig';
import expressAuthentication from '../helpers/expressAuthentication';

const { SERVER_HOST, PORT, NODE_ENV } = process.env;
const router = express.Router();
const basePath = `${appRoot.path}/src/controllers`;
const apiDoc = {
  swagger: '2.0',
  title: 'Portal Backend Doc.',
  info: {
    description:
      'This documentation gives real examples of how you should consume the Amicar Core API. For this sample, you can use the api key `special-key` to test the authorization filters.',
    version: '1.2.0',
    title: 'Portal Backend Doc.',
    termsOfService: 'https://www.amicar.cl/terminos-y-condiciones',
    contact: {
      email: 'ti@amicar.cl',
    },
  },
  host: NODE_ENV !== 'production' ? `${SERVER_HOST}:${PORT}` : SERVER_HOST,
  basePath: '/v1',
  schemes: ['https', 'http'],
  paths: {},
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    },
  },
  definitions: {},
};

module.exports = (dependency) => {
  fs.readdirSync(basePath).forEach((dirName) => {
    const dirPath = `${basePath}/${dirName}`;
    if (fs.lstatSync(dirPath).isDirectory()) {
      try {
        const ctrlPaths = require(dirPath);
        const { paths, definitions } = require(`${dirPath}/apiDoc.json`);
        apiDoc.paths = { ...apiDoc.paths, ...paths };
        apiDoc.definitions = { ...apiDoc.definitions, ...definitions };
        for (const key in ctrlPaths) {
          if (ctrlPaths.hasOwnProperty(key)) {
            ctrlPaths[key].forEach(({ method, path, ctrl, authenticationRequired }) => {
              const middleware = [];
              if (authenticationRequired) middleware.push(expressAuthentication);
              if (ctrl) middleware.push(ctrl(dependency));
              router.route(`/${key}${path}`)[method](...[...middleware]);
            });
          }
        }
      } catch (err) {
        rollbar.log(`src/controllers/index::ERROR: ${err.message}`);
      }
    }
  });
  return { router, apiDoc };
};
