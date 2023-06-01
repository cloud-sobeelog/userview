const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { commentDB, emoticonDB } = require("../../models");

module.exports = async (req, res) => {
    try {
        const {cHistoryID} = req.params;
        const {userID, category} = req.body;

        // 이미 좋아요/ 싫어요를 했는지 확인
        const check = await emoticonDB.isUserEmoticon(cHistoryID, userID);
        
        if (check.length == 0) { // 아직 좋아요/ 싫어요를 하지 않은 경우
            const result = await emoticonDB.postEmoticon(cHistoryID, userID, category);

            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.ADD_EMOTICON_SUCCESS, result));
        }
    }
    catch(err) {
        console.log(err);
    }
}