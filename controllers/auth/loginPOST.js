const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { authDB } = require("../../models");

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;

        // 세션에 유저가 존재하는 상태 -> 이미 로그인되어 있음.
        if (req.session.user) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_LOGIN));
        }

        const result = await authDB.getOneUser(email); // 유저 가져오기

        // 존재하지 않는 이메일
        if (result.length == 0) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_EMAIL));
        }

        // 이메일로 유저를 검색 가능하고, 비밀번호가 같은 경우
        if (password == result[0].password) {
            req.session.user = {
                id: email,
                password: password,
                name: result[0].nickname,
                authorized: true,
            }

            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, result));
        }
        else { // 비밀번호 잘못 입력
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
        }
    }
    catch(err) {
        console.log(err);
    }
}