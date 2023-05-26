const { db } = require("./db");

const getConsumptionHistoryByMonth = async(month, userID) => {
    let sql = 
    `SELECT DISTINCT date 
    From consumptionHistory 
    WHERE date LIKE '${month}%' 
    AND userID = ${userID}`;
    let [rows,fields] = await db.query(sql);
    console.log(rows);
    return rows
};

const getCommentAndReactionByMonth = async(month, userID) => {
    let sql = 
    `
    SELECT DISTINCT ch.date FROM consumptionHistory ch, comment c, emoticon e 
    WHERE ch.date LIKE '${month}%'
    AND c.cHistoryID = ch.cHistoryID
    OR e.cHistoryID = ch.cHistoryID 
    AND ch.userID = ${userID}
    ORDER BY ch.date ASC 
    `
    let [rows, fields] = await db.query(sql);
    return rows;
}
module.exports = {
    getConsumptionHistoryByMonth,
    getCommentAndReactionByMonth
}