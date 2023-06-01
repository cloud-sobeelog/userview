const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { commentDB } = require("../../models");

module.exports = async (req, res) => {
    try {
        const {cHistoryID} = req.params;
        const {userID, content, replyID} = req.body;

        // replyID에 값이 없다면 댓글, 있다면 대댓글
        if (replyID === undefined) {
            replyID = null;
        }

        // 글자 수 제한 확인
        if (content.length >= 150) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOO_MUCH_LONG_VALUE));
        }

        // +댓글을 달려고 하는 소비내역의 존재유무 확인

        const result = await commentDB.postComment(cHistoryID, userID, content, replyID);

        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.ADD_ONE_COMMENT_SUCCESS, result));
    }
    catch(err) {
        console.log(err);
    }
}