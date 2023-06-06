const express = require('express');
const joinPOST = require('../../controllers/user/joinPOST');
const router = express.Router();

router.post('/join', passport.postjoin ('local-join', 
 {
    successRedirect: '/',
    failureRedirect: '/join',
    failureFlash: true
  }));

module.exports = router;