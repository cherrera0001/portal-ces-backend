import appRoot from 'app-root-path';
import express from 'express';
import fs from 'fs';

import rollbar from '../config/rollbarConfig';
import expressAuthentication from '../helpers/expressAuthentication';

const router = express.Router();
const basePath = `${appRoot.path}/src/controllers`;

module.exports = (dependency) => {
  fs.readdirSync(basePath).forEach((dirName) => {
    const dirPath = `${basePath}/${dirName}`;
    if (fs.lstatSync(dirPath).isDirectory()) {
      try {
        const ctrlPaths = require(dirPath);
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
  return { router };
};
