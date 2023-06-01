const {db} = require("./db");

const getMyFriendsList = async(userid) => {
    let sql = `
        SELECT f.friendID, f.user2ID as friendUserID, u.nickname 
        FROM friend f
        JOIN user u
        ON f.user2ID = u.userID
        WHERE f.user1ID = ? AND f.accepted = 1;
    `;
    let [rows, fields] = await db.execute(sql, [userid]);
    console.log(rows);
    return rows;
}

const getNicknamedUserList = async(nickname) => {
    let keyword = '%' + nickname + '%';
    let sql = `
        SELECT u.userID as userId, u.nickname as nickname
        FROM user u
        WHERE u.nickname LIKE ?;
    `;
    let [rows] = await db.query(sql, [keyword]);
    console.log(rows);
    return rows;
}

const getReceivedFriendRequestsList = async(userid) => {
    let sql = `
        SELECT f.friendID as friendID, f.user2ID as userID, u.nickname as nickname
        FROM friend f
        JOIN user u
        ON f.user2ID = u.userID
        WHERE f.user1ID = ? AND f.accepted = 0;
    `;
    let [rows] = await db.execute(sql, [userid]);
    console.log(rows);
    return rows;
}

const checkValidUser = async(userid) => {
    let sql = `SELECT exists(SELECT 1 FROM user u WHERE u.userID LIKE ?) as result;`;
    let [rows] = await db.execute(sql, [userid]);
    const result = rows[0].result === 1;
    //console.log(rows);
    return result;
}

module.exports = {
    getMyFriendsList,
    getNicknamedUserList,
    getReceivedFriendRequestsList,
    checkValidUser,
}