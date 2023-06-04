const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { authDB, userDB } = require("../../models");

module.exports = async (req, res) => {

    try
    {
        passport.use('local-join', new LocalStrategy({
            usernameField: 'userID',
            passwordField: 'password',
            passReqToCallback: true
          }, function (req, userID, password, done) {
            console.log('local-join');
          }))
          
    }
    
        
        catch(err) 
        {
            console.log(err);
        }
    }