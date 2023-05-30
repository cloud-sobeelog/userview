const express = require('express');
const router = express.Router();
const myFriendsListGET = require('../../controllers/friends/myFriendsListGET');
const findUserListGET = require('../../controllers/friends/findUserListGET');


router.get('/search', findUserListGET);
router.get('/:userid', myFriendsListGET);

module.exports = router;