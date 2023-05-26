const express = require('express');
const router = express.Router();
const monthlyCalendarGET = require('../../controllers/mycalendar/monthlyCalendarGET');

router.get('/month/:month',monthlyCalendarGET);
module.exports = router;