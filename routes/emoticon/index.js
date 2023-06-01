const express = require('express');
const emoticonPOST = require('../../controllers/emoticon/emoticonPOST');
const router = express.Router();

router.post('/:cHistoryID', emoticonPOST); // 공감하기(좋아요/ 싫어요)
module.exports = router;