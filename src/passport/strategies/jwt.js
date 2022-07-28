import { Strategy } from 'passport-jwt';
import { secret } from '../../utils/jwt.js';

const cookieExtractor = (req) => {
  let accessToken = null;
  if (req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }
  return accessToken;
};

const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

export const jwt = new Strategy(opts, (user, done) => {
  done(null, user);
});
