const mongoose = require('mongoose');
const rollbar = require('rollbar');

const { NODE_ENV, MONGO_COMMAND, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;

const connectDB = async () => {
  try {
    const MONGO_URI = `${MONGO_COMMAND}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}_${NODE_ENV}`;
    mongoose.connect(`${MONGO_URI}?retryWrites=true&w=majority`, {
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
