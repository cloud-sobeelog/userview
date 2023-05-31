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

module.exports = {
    getMyFriendsList,
}