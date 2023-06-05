const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const util = require("../../lib/util");
const { userDB } = require("../../models");

module.exports = async (req, res) => {
    const { userID, password } = req.body;
  
    try {
      await postjoin(userID, password, function (error, userId) {
        if (error) {
          console.error("회원가입 실패:", error);
          res.status(500).send( INTERNAL_SERVER_ERROR);
        } else {
          console.log(CREATED_USER + " User ID: ", userId);
          res.status(200).send(CREATED_USER);
        }
      });

    } catch (error) {
      console.error("회원가입 실패:", error);
      res.status(500).send( INTERNAL_SERVER_ERROR);
    }
  };