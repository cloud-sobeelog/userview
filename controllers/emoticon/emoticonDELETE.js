const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { commentDB, emoticonDB } = require("../../models");

module.exports = async (req, res) => {
    try {
        const {cHistoryID} = req.params;
        const {userID, category} = req.body;

        const check = await emoticonDB.isUserEmoticon(cHistoryID, userID);
        
        if (check.length > 0) { // 이미 공감한 적이 있는 소비내역인지 확인
            if (check[0].category == category) { // 전에 공감한 것과 같은 것을 선택했는지 확인
                const result = await emoticonDB.deleteEmoticon(cHistoryID, userID);

                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_CMOTICON_SUCCESS, result));
            }
        }
    }
    catch(err) {
        console.log(err);
    }
}