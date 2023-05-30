const express = require('express');
const router = express.Router();

router.use('/mycalendar', require('./mycalendar'));
router.use('/consumptionhistory',require('./consumptionHistory')); 
router.use('/friends', require('./friends'));
router.use('/comment', require('./comment'));
module.exports = router;