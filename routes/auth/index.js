const express = require('express');
const router = express.Router();

const loginPOST = require('../../controllers/auth/loginPOST');

router.post('/login', loginPOST);

module.exports = router;