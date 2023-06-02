const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { consumptionHistoryDB } = require("../../models");

const categoryList = ['쇼핑', '음식', '생필품', '취미', '교통', '경조사'];

module.exports = async (req, res) => {
    try{
        // TODO: userID가 지금은 body에 담아오지만 나중에는 header에 userToken으로 알아내야함
        const {content, date, amount, category, secret, userID} = req.body;
        console.log(date);
        const newCategory = '\'' + category + '\'';
        
        // INFO: 카테고리 한정하기 위해 배열에 미리 저장 후 검사
        if(!categoryList.includes(category)){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE))
        }

        // INFO: content 길이 검사
        if(content.length >= 50){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOO_MUCH_LONG_VALUE))
        }

        const result = await consumptionHistoryDB.postConsumptionHistory(userID, date, content, amount, newCategory, secret);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.ADD_ONE_POST_SUCCESS));
    }
    catch(err){
        console.log(err)
    }
}