const mongoose = require('mongoose');
const rollbar = require('rollbar');

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI_PORTAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    rollbar.log(`mongoose-connection::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = connectDB;
