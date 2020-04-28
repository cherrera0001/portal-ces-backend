import { ApolloError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { UsersModel } from '../../../../helpers/modelsExport';
import { setTokens } from '../../../../auth';

export default async ({ data: { email, password }, rollbar }) => {
  try {
    const user = await UsersModel.findOne({ email });
    if (!user) throw new Error('USER_NOT_FOUND');
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error('INVALID_PASSWORD');
    return setTokens(user);
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/login/index::ERROR: ${err.message}`);
    if (err.message === 'MISSING_LOAN_ID') throw new ApolloError('User id not found.', 'USER_NOT_FOUND');
    if (err.message === 'INVALID_PASSWORD') throw new ApolloError('Invalid password.', 'INVALID_PASSWORD');
    throw new Error(err.message);
  }
};
