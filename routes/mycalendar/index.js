const express = require('express');
const router = express.Router();
const monthlyCalendarGET = require('../../controllers/mycalendar/monthlyCalendarGET');
const dateCalendarGET = require('../../controllers/mycalendar/dateCalendarGET');

router.get('/date/:date',dateCalendarGET);
router.get('/month/:month',monthlyCalendarGET);

module.exports = router;