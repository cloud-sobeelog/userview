const express = require('express');
const router = express.Router();

router.use('/mycalendar', require('./mycalendar'));
router.use('/consumptionhistory',require('./consumptionHistory')); 
router.use('/calendarfeed',require('./calendarFeed'));
router.use('/friends', require('./friends'));

module.exports = router;