const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userDB } = require('../../models');

passport.use('local-join', new LocalStrategy({
  usernameField: 'userID',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, userID, password, done) => {
  try {
    const userId = await userDB.postjoin(userID, password);
    return done(null, { userId });
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;