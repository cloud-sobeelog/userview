const express = require('express');
const router = express.Router();

router.use('/view', require('./view'));

module.exports = router;