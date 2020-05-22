import { sign, verify } from 'jsonwebtoken';
import { UsersModel } from '../helpers/modelsExport';

const { JWT_SECRET } = process.env;

const setTokens = (user) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const twentyMins = 60 * 20 * 1000;
  const accessToken = sign({ user: user.id, claims: user.claims }, JWT_SECRET, {
    expiresIn: twentyMins,
  });

  const refreshToken = sign({ user: user.id, claims: user.claims }, JWT_SECRET, {
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
  let user = null;
  let claims = null;

  if (!accessToken && !refreshToken) return { user, claims };
  const decodedAccessToken = verifyToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    user = decodedAccessToken.user;
    claims = decodedAccessToken.claims;
    return { user, claims };
  }

  const decodedRefreshToken = verifyToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    user = await UsersModel.findById(decodedRefreshToken.user);
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
