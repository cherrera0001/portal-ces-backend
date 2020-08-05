<<<<<<< HEAD
const mongoose = require('mongoEficar')();
=======
const mongoose = require('mongoose');
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b

const schema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    externalCode: { type: String },
    parentId: { type: Number },
    type: { type: String },
  },
  {
    collection: 'params',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

<<<<<<< HEAD
module.exports = mongoose.model('Params', schema);
=======
const db = mongoose.connection.useDb('eficar');
module.exports = db.model('Params', schema);
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b
