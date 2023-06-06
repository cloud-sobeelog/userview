const {db} = require("./db");
const crypto = require("crypto");

const postjoin = async(userID, password, callback) => {

  const salt = crypto.randomBytes(16).toString('hex'); //16바이트 난수 생성 후 문자열로 변환
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); //비밀번호 해싱 후 문자열로 변환

  let sql = `INSERT INTO user
  (userID, hashedPassword)
  VALUES (${userID}, ${hashedPassword})`;

  let [rows] = await db.query(sql);

  console.log(rows);
};

module.exports = {
    postjoin
}