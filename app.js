const express = require('express');
const app = express()
const mysql = require('mysql2/promise');
require('dotenv').config();

app.set("port",process.env.PORT || 8080);
app.use(
    express.urlencoded({
        extended: false
    })
)

app.get("/",(req,res) => {
    res.send("Welcome")
})

app.listen(app.get("port"),()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
})

let test = async() => {
    const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        waitForConnections:true,
        insecureAuth: true
    })
    let sql = 'SELECT * FROM professor';
    let [rows,fields] = await db.query(sql);
    console.log(rows);
}
test();