const express = require('express');
const router = express.Router();
const myFriendsListGET = require('../../controllers/friends/myFriendsListGET');

router.get('/:userid', myFriendsListGET);

module.exports = router;