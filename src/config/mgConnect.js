import mongoose from 'mongoose';
import rollbar from 'config/rollbarConfig';
const { NODE_ENV, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;
const getMongoURI = () => {
  return `mongodb${
    NODE_ENV === 'production' || NODE_ENV === 'staging' ? '+srv' : ''
  }://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}_${NODE_ENV}?retryWrites=true&w=majority`;
};
try {
  console.log({ NODE_ENV });
  console.log({ MONGO_USERNAME });
  console.log({ MONGO_PASSWORD });
  console.log({ MONGO_HOST });
  console.log({ MONGO_DB });
  mongoose.connect(getMongoURI(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (err) {
  console.log({ err });
  rollbar.log(`mongoose-connection::ERROR: ${err.message}`);
  throw new Error(err.message);
}