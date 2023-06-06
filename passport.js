const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userDB } = require('../models/userDB');

passport.use('local-join', new LocalStrategy({
  usernameField: 'userID',
  passwordField: 'password',
  passReqToCallback: true
}, 

async (req, userID, password, done) => {
  try {
    
    const existingUser = await userDB.getUser(userID);
    if (existingUser) 
    {
      return done(null, false, { message: ALREADY_userID});
    }
    
    await userDB.postjoin(userID, password);
    return done(null, { userID });  //회원가입 처리
  } 
  catch (error) {
    return done(error);
  }
}));

module.exports = passport;