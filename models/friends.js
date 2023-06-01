const {db} = require("./db");

const getMyFriendsList = async(userid) => {
    let sql = `
        SELECT f.friendID, f.user2ID as friendUserID, u.nickname 
        FROM friend f
        JOIN user u
        ON f.user2ID = u.userID
        WHERE f.user1ID = ? AND f.accepted = 1;`;
    let [rows, fields] = await db.execute(sql, [userid]);
    console.log(rows);
    return rows;
}

const getNicknamedUserList = async(nickname) => {
    let keyword = '%' + nickname + '%';
    let sql = `
        SELECT u.userID as userId, u.nickname as nickname
        FROM user u
        WHERE u.nickname LIKE ?`;
    let [rows] = await db.query(sql, [keyword]);
    console.log(rows);
    return rows;
}

module.exports = {
    getMyFriendsList,
    getNicknamedUserList,
}