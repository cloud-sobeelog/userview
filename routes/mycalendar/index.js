const express = require('express');
const router = express.Router();
const monthlyCalendarGET = require('../../controllers/mycalendar/monthlyCalendarGET');
const dateCalendarGET = require('../../controllers/mycalendar/dateCalendarGET');
const totalConsumptionAmountGET = require('../../controllers/mycalendar/totalConsumptionAmountGET')

router.get('/month/:month',monthlyCalendarGET);
router.get('/date/:date',dateCalendarGET);
router.get('/amount',totalConsumptionAmountGET);

module.exports = router;