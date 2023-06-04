const {db} = require("./db");
var bcrypt = require('bcrypt-nodejs');

const cnn = mysql.createConnection({
    host: 'localhost',
    user: 'userID',
    password: 'password',
    database: 'DB_user'
});

exports.createPOST = ( data, cb ) => {
    var sql = `INSERT INTO user VALUES ( '${data.userID}','${data.password}');`;

    cnn.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( data.userID );
    });
}
