const mongoose = require('mongoose');
const rollbar = require('rollbar');

const { NODE_ENV, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;

console.log({ NODE_ENV });
console.log({ MONGO_USERNAME });
console.log({ MONGO_PASSWORD });
console.log({ MONGO_HOST });
console.log({ MONGO_DB });

const getMongoURI = () => {
  return `mongodb${
    NODE_ENV === 'production' || NODE_ENV === 'staging' ? '+srv' : ''
  }://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}_${NODE_ENV}?authSource=admin&retryWrites=true&w=majority`;
};

try {
  mongoose
    .connect(getMongoURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.error({ err });
    });
} catch (err) {
  console.error({ err });
  rollbar.log(`mongoose-connection::ERROR: ${err.message}`);
  throw new Error(err.message);
}
