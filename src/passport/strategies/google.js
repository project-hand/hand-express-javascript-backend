import 'dotenv/config';
import { Strategy } from 'passport-google-oauth20';
import { User } from '../../models/index.js';

const config = {
  clientID: process.env.GOOGLE_OAUTH_ID, // clientId 설정하기
  clientSecret: process.env.GOOGLE_OAUTH_KEY, // clientSecret 설정하기
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser(email, name) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }
  const created = await User.create({
    email,
    name,
  });

  return created;
}

export const google = new Strategy(
  config,
  async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    const { email, name } = profile._json;
    try {
      const { _id, authority, friends } = await findOrCreateUser(email, name);
      done(null, {
        _id,
        authority,
        friends,
        email,
        name,
      });
    } catch (e) {
      done(e, undefined);
    }
  }
);
