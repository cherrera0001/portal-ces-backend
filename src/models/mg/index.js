const path = require('path');
const fs = require('fs');

const basePath = __dirname;
fs.readdirSync(basePath).forEach((file) => {
  if (file.indexOf('index.js') >= 0 || file.indexOf('.map') >= 0 || file.indexOf('.DS_Store') >= 0) return;
  module.exports[`${path.basename(file, '.js')}Model`] = require(path.join(basePath, file));
});
