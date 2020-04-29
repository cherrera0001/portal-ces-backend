import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
  {
    name: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    type: mongoose.Schema.Types.String,
    claims: [mongoose.Schema.Types.String],
  },
  {
    collection: 'users',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('Users', UsersSchema);
