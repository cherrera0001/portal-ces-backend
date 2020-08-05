const mongoose = require('mongoose');
const rollbar = require('rollbar');

const connectDB = () => {
  try {
<<<<<<< HEAD
    mongoose.connect(process.env.MONGO_URI_PORTAL, {
=======
<<<<<<< HEAD:src/mongoEficar.js
    mongoose.connect(process.env.MONGO_URI_EFICAR, {
=======
    mongoose.connect(process.env.MONGO_URI_PORTAL, {
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b:src/mongoPortal.js
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    return mongoose;
  } catch (err) {
    rollbar.log(`mongoose-connection::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = connectDB;
