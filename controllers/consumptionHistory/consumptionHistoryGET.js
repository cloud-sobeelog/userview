const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { consumptionHistoryDB } = require("../../models");

module.exports = async (req, res) => {
    try{
        const result = await consumptionHistoryDB.getConsumptionHistory();
        console.log(result);
    }
    catch(err){
        console.log(err)
    }
}