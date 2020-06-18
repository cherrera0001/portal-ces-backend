const { ApolloError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const { UsersModel } = require('../../../../helpers/modelsExport');
const { setTokens } = require('../../../../auth');

const PASSWORD_REGEX = /(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

const getUserClaimsByType = (type) => {
  let claims = [];

  switch (type) {
    case 'user':
      claims = ['see_simulations', 'see_applications'];
      break;
    default:
      claims = [];
  }
  return claims;
};

export default async ({ data: { name, email, password, type }, rollbar }) => {
  try {
    if (!name || !email || !password || !type) throw new Error('MISSING_FIELDS');
    //if (!password.match(PASSWORD_REGEX)) throw new Error('INVALID_PASSWORD');
    const alreadyExists = await UsersModel.findOne({ email });
    if (alreadyExists) throw new Error('EMAIL_TAKEN');

    const user = new UsersModel({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      claims: getUserClaimsByType(type),
      type,
    });

    await user.save();
    return setTokens(user);
  } catch (err) {
    console.error(err);
    rollbar.log(`src/methods/chl/v1/signUp/index::ERROR: ${err.message}`);
    if (err.message === 'INVALID_PASSWORD') throw new ApolloError('Invalid password format.', 'INVALID_PASSWORD');
    if (err.message === 'EMAIL_TAKEN') throw new ApolloError('Email is already registered.', 'EMAIL_TAKEN');
    if (err.message === 'MISSING_FIELDS') throw new ApolloError('Email is already registered.', 'EMAIL_TAKEN');
    throw new Error(err.message);
  }
};
