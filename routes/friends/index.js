const express = require('express');
const router = express.Router();
const myFriendsListGET = require('../../controllers/friends/myFriendsListGET');
const findUserListGET = require('../../controllers/friends/findUserListGET');
const receivedFriendRequestsListGET = require('../../controllers/friends/receivedFriendRequestsListGET');

router.get('/search', findUserListGET);
router.get('/requests/:userid', receivedFriendRequestsListGET);
router.get('/:userid', myFriendsListGET);

module.exports = router;