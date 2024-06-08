const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { client } = require("../../lib/api");
const util = require("../../lib/util");

function dateFormat(date) {
    //yyyy-mm-dd 포맷 날짜 생성
    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
}

module.exports = async (req, res) => {
    try{
        // TODO: userID 헤더로 받아서 getCalendarFeed 인자로 넘겨줘야함.
        const {userID} = req.params;

        // TODO: userID 기준으로 친구 모두 조회해서 ID를 모아야 
        const {data} = await client.get(`/friends/${userID}`);
        var friendsList = [];
        if(data.success){
            for(let friend of data.data.friendsList){
                friendsList.push(friend.friendUserID);
            }
        }
    
        var feedsList = [];
        for(var i=0; i<friendsList.length; i++){
            console.log(`/consumptions/user/${friendsList[i]}/${userID}`);
            const {data} = await client.get(`/consumptions/user/${friendsList[i]}/${userID}`);
            for(let consumption of data.data.result){
                feedsList.push(consumption);
            }
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
            return data.data[0].count;
        }

        for(feed of feedsList){
            const writerNicknameData = await client.get(`/user/userInfo/${feed.userID}`);
            feed.writerNickname = writerNicknameData.data.data[0].nickname;

            const commentData = await getCommentListByHistoryID(feed.cHistoryID);
            feed.comment = commentData;

            const commentCountData = await getCommentCountByHistoryID(feed.cHistoryID);
            feed.commentCount = commentCountData;
    
            const positiveEmoticonCountData = await client.get(`/emoticon/${feed.cHistoryID}/0`);
            feed.positiveEmoticonCount = positiveEmoticonCountData.data.data;

            const negativeEmoticonCountData = await client.get(`/emoticon/${feed.cHistoryID}/1`);
            feed.negativeEmoticonCount = negativeEmoticonCountData.data.data;
            console.log(feed);
        }
        // let result = await calendarDB.getCalendarFeed(userID);
        // async function asyncForEach(result) {
        //     for (let index = 0; index < result.length; index++) {
        //         result[index].date = dateFormat(result[index].date);
        //         result[index].commentCount = (await calendarDB.getCountOfComment(result[index].cHistoryID))[0].count;
        //         result[index].positiveEmoticonCount = (await calendarDB.getCountOfEmoticon(result[index].cHistoryID,0));
        //         result[index].negativeEmoticonCount = (await calendarDB.getCountOfEmoticon(result[index].cHistoryID,1));
        //         result[index].comment = (await calendarDB.getCommentByHistoryID(result[index].cHistoryID));    
        //         result[index].comment.forEach(element => element.date = dateFormat(element.date))            
        //         result[index].emoticon = (await calendarDB.getEmoticonByHistoryID(result[index].cHistoryID));
        //     }
        //     return result;
        // }
        

        // const feedList = await asyncForEach(result);
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_FRIEND_CALENDAR_SUCCESS, {
            userID: userID,
            feedList: feedsList
        }));
    }
    catch(err){
        console.log(err)
    }
}