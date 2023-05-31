const express = require('express');
const router = express.Router();
const dateCalendarGET = require('../../controllers/mycalendar/dateCalendarGET');

router.get('/date/:date',dateCalendarGET);

module.exports = router;