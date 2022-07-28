import passport from 'passport';

function getUserFromJWT(req, res, next) {
  if (req.cookies.accessToken) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  } else {
    next();
  }
}

export { getUserFromJWT };
