const express = require('express');
const router = express.Router();

router.use('/mycalendar', require('./mycalendar'));

module.exports = router;