const express = require('express');
const joinPOST = require('../../controllers/user/joinPOST');
const router = express.Router();
const passport = require('../passport');

router.post('/join', 
  passport.authenticate('local-join', {
    successRedirect: '/',
    failureRedirect: '/join'
  }), 
  joinPOST
);

module.exports = router;