import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { UsersModel } from '../../../../helpers/modelsExport';
import { setTokens } from '../../../../auth';

export default async ({ data: { email, password, type }, rollbar }) => {
  try {
    const user = new UsersModel({
      email,
      password: await bcrypt.hash(password, 10),
      type,
    });

    await user.save();
    return setTokens(user);
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/signUp/index::ERROR: ${err.message}`);
    // if (err.message === 'MISSING_LOAN_ID') throw new ApolloError('User id not found.', 'USER_NOT_FOUND');
    // if (err.message === 'INVALID_PASSWORD') throw new ApolloError('Invalid password.', 'INVALID_PASSWORD');
    throw new Error(err.message);
  }
};
