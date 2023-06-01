const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { commentDB } = require("../../models");

module.exports = async (req, res) => {
    try { // + if 글자 수 제한 확인, 댓글과 대댓글의 관계
        const result = await commentDB.postComment();
        console.log(result);
    }
    catch(err) {
        console.log(err);
    }
}