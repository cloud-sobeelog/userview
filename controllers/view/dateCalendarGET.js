const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { client } = require("../../lib/api");
const util = require("../../lib/util");

function dateFormat(date) {
    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? 
    (date.getMonth() + 1).toString() : "0" + (date.getMonth() +1)) 
    + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0"
    + date.getDate().toString());
}

module.exports = async (req, res) => {
    try {
        const { date, userID } = req.params;
        if(!date) {
            return res.status(statusCode.NOT_FOUND).send(util.fail
                (statusCode.NOT_FOUND, responseMessage.NULL_VALUE))
        }
        if(date.length < 10) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail
                (statusCode.BAD_REQUEST, responseMessage.OUT_OF_VALUE))
        }

        const consumptionsData = await client.get(`/consumptions/date/${date}/${userID}`);
        const consumptionsList = [];
        for(let consumption of consumptionsData.data.data.result){
            consumptionsList.push(consumption);
        }

        const getCommentListByHistoryID = async(chistoryID) => {
            const {data} = await client.get(`/comment/${chistoryID}`);
            const list = data.data;
            list.forEach(element => {
                const date = new Date(element.date);
                element.date = dateFormat(date);
            });
            return list;
        }

        const getCommentCountByHistoryID = async(chistoryID) => {
            const {data} = await client.get(`/comment/count/${chistoryID}`);
            console.log(data);
            return data.data[0].count;
        }

        for(consumption of consumptionsList){
            console.log(consumption);
            const writerNicknameData = await client.get(`/user/userInfo/${consumption.userID}`);
            consumption.writerNickname = writerNicknameData.data.data[0].nickname;
            
            const commentData = await getCommentListByHistoryID(consumption.cHistoryID);
            consumption.comment = commentData;

            const commentCountData = await getCommentCountByHistoryID(consumption.cHistoryID);
            consumption.commentCount = commentCountData;

            const positiveEmoticonCountData = await client.get(`/emoticon/${consumption.cHistoryID}/0`);
            consumption.positiveEmoticonCount = positiveEmoticonCountData.data.data;

            const negativeEmoticonCountData = await client.get(`/emoticon/${consumption.cHistoryID}/1`);
            consumption.negativeEmoticonCount = negativeEmoticonCountData.data.data;
        }

        console.log(consumptionsList);
        // var feedsList = [];
        // for(var i=0; i<friendsList.length; i++){
        //     const {data} = await client.get(`/consumptions/user/${friendsList[i]}`);
        //     console.log(data);
        //     for(let consumption of data.data.result){
        //         feedsList.push(consumption);
        //     }
        // }
        // let result = await calendarDB.getConsumptionHistoryByDate(userID,date);
        // async function asyncForEach(result) {
        //     for (let index = 0; index < result.length; index++) {
        //         result[index].date = dateFormat(result[index].date);
        //         result[index].comment = (await calendarDB.getCommentByHistoryID(result[index].cHistoryID));
        //         result[index].comment.forEach(element => element.date = dateFormat(element.date))
        //         result[index].commentCount = (await calendarDB.getCountOfComment(result[index].cHistoryID))[0].count;
        //         result[index].emoticon = (await calendarDB.getEmoticonByHistoryID(result[index].cHistoryID));
        //         result[index].positiveEmoticonCount = (await calendarDB.getCountOfEmoticon(result[index].cHistoryID,0));
        //         result[index].negativeEmoticonCount = (await calendarDB.getCountOfEmoticon(result[index].cHistoryID,1));
        //     }
        //     return result;
        // }
        
        return res.status(statusCode.OK).send(util.success
            (statusCode.OK, responseMessage.READ_CONSUMPTION_DATE_SUCCESS, {
                userID: userID,
                result: consumptionsList
        }));
    }

    catch(err) {
        console.log(err)
    }
}

