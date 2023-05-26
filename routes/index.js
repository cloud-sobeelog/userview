const express = require('express');
const router = express.Router();

router.use('/mycalendar', require('./mycalendar'));
router.use('/consumptionhistory',require('./consumptionHistory')); 
router.use('/calendarfeed',require('./calendarFeed'));
module.exports = router;