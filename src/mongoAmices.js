const mongoose = require('mongoose');
const rollbar = require('rollbar');

const connectDB = () => {
  try {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.MONGO_URI_AMICES, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    rollbar.log(`mongoose-connection::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = connectDB;
