
const express = require('express');
const createPOST = require('../../controllers/user/createPOST');
const userIDPUT = require('../../controllers/user/userIDPUT');
const router = express.Router();

router.post('/create',createPOST);

module.exports = router;