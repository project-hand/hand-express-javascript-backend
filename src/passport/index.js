import passport from 'passport';

import { jwt } from './strategies/jwt.js';
import { google } from './strategies/google.js';
import { kakao } from './strategies/kakao.js';

export function usePassport() {
  passport.use(jwt);
  passport.use(google);
  passport.use(kakao);
}
