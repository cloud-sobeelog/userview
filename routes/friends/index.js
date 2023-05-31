const express = require('express');
const router = express.Router();
const findUserListGET = require('../../controllers/friends/findUserListGET');
const friendRequestPOST = require('../../controllers/friends/friendRequestPOST');
const friendRequestAcceptPATCH = require('../../controllers/friends/friendRequestAcceptPATCH');
const receivedFriendRequestsListGET = require('../../controllers/friends/receivedFriendRequestsListGET');
const myFriendsListGET = require('../../controllers/friends/myFriendsListGET');

router.post('/requests', friendRequestPOST);
router.patch('/requests', friendRequestAcceptPATCH);
router.get('/search', findUserListGET);
router.get('/requests/:userid', receivedFriendRequestsListGET);
router.get('/:userid', myFriendsListGET);

module.exports = router;