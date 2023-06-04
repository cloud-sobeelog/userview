const express = require('express');
const router = express.Router();

router.use('/mycalendar', require('./mycalendar'));
router.use('/consumptionhistory',require('./consumptionHistory')); 
router.use('/comment', require('./comment'));
router.use('/calendarfeed',require('./calendarFeed'));
router.use('/friends', require('./friends'));
router.use('/emoticon', require('./emoticon'));
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));


module.exports = router;