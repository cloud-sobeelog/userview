const express = require('express');
const router = express.Router();
const dateCalendarGET = require('../../controllers/view/dateCalendarGET');
const calendarFeedGET = require('../../controllers/view/calendarFeedGET');

router.get('/date/:date/:userID',dateCalendarGET);
router.get('/:userID',calendarFeedGET);


module.exports = router;