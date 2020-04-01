import mongoose from 'mongoose';
import '../seeds/mongo';

const { MONGO_URI: mongodbUri } = process.env;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
