const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { client } = require("../../lib/api");
const util = require("../../lib/util");

function dateFormat(date) {
    //yyyy-mm-dd 포맷 날짜 생성
    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
}

module.exports = async (req, res) => {
    try {
        // TODO: userID 헤더로 받아서 getCalendarFeed 인자로 넘겨줘야함.
        const { userID } = req.params;

        // TODO: userID 기준으로 친구 모두 조회해서 ID를 모아야
        const { data } = await client.get(`/friends/${userID}`);
        const friendsList = data.success ? data.data.friendsList.map(friend => friend.friendUserID) : [];
        
        // 병렬로 친구들의 소비 기록 가져오기
        const consumptionsPromises = friendsList.map(friendID => 
            client.get(`/consumptions/user/${friendID}/${userID}`).then(response => response.data.data.result)
        );

        const consumptionsResults = await Promise.all(consumptionsPromises);
        console.log(consumptionsResults);
        const feedsList = consumptionsResults.flat();

        const getCommentListByHistoryID = async (chistoryID) => {
            const { data } = await client.get(`/comment/${chistoryID}`);
            return data.data.map(element => ({
                ...element,
                date: dateFormat(new Date(element.date))
            }));
        };

        const getCommentCountByHistoryID = async (chistoryID) => {
            const { data } = await client.get(`/comment/count/${chistoryID}`);
            return data.data[0].count;
        };

        // 각 피드에 대한 추가 데이터 병렬로 처리
        const feedsWithDetailsPromises = feedsList.map(async (feed) => {
            const [writerNicknameData, commentData, commentCountData, positiveEmoticonCountData, negativeEmoticonCountData] = await Promise.all([
                client.get(`/user/userInfo/${feed.userID}`),
                getCommentListByHistoryID(feed.cHistoryID),
                getCommentCountByHistoryID(feed.cHistoryID),
                client.get(`/emoticon/${feed.cHistoryID}/0`),
                client.get(`/emoticon/${feed.cHistoryID}/1`)
            ]);

            return {
                ...feed,
                writerNickname: writerNicknameData.data.data[0].nickname,
                comment: commentData,
                commentCount: commentCountData,
                positiveEmoticonCount: positiveEmoticonCountData.data.data,
                negativeEmoticonCount: negativeEmoticonCountData.data.data
            };
        });

        const feedsWithDetails = await Promise.all(feedsWithDetailsPromises);

        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_FRIEND_CALENDAR_SUCCESS, {
            userID,
            feedList: feedsWithDetails
        }));
    } catch (err) {
        console.error(err);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
};
