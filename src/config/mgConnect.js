import mongoose from 'mongoose';

const { MONGO_URI: mongodbUri } = process.env;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
