const express = require('express');
const app = express()
const dbConfig = require('./models/db')
const db = dbConfig.db
require('dotenv').config();

app.set("port",process.env.PORT || 8081);
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
    let sql = 'SELECT * FROM professor';
    let [rows,fields] = await db.query(sql);
    console.log(rows);
}
test();

app.use('/',require('./routes'));