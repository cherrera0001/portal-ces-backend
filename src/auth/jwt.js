import { sign, verify } from 'jsonwebtoken';
import { UsersModel } from '../helpers/modelsExport';

const { JWT_SECRET } = process.env;

const setTokens = (user) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessToken = sign({ user: user.id }, JWT_SECRET, {
    expiresIn: fifteenMins,
  });
  const refreshUser = {
    id: user.id,
    count: user.tokenCount,
  };
  const refreshToken = sign({ user: refreshUser }, JWT_SECRET, {
    expiresIn: sevenDays,
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const getUser = async (accessToken, refreshToken, res) => {
  let user;
  let claims;

  if (!accessToken && !refreshToken) return { user, claims };
  const decodedAccessToken = verifyToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    user = decodedAccessToken.user;
    claims = decodedAccessToken.claims;
    return { user, claims };
  }

  const decodedRefreshToken = verifyToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    user = await UsersModel.findOne({ _id: decodedRefreshToken.user.id });

    if (!user) return { user: null, claims: null };

    const userTokens = setTokens(user);
    res.set({
      'Access-Control-Expose-Headers': 'x-access-token,x-refresh-token',
      'x-access-token': userTokens.accessToken,
      'x-refresh-token': userTokens.refreshToken,
    });

    claims = user.claims;
    return { user, claims };
  }
  return { user, claims };
};

export { getUser, setTokens };
