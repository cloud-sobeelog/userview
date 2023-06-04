const express = require('express');
const app = express()
const dbConfig = require('./models/db')
const db = dbConfig.db
const cors = require('cors');

var passport = require('passport');
var LocalStrategy = require('passport-local').strategy;
var session = require('express-session');
var flash = require('connect-flash');

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

require('dotenv').config();

app.use(cors());
app.set("port",process.env.PORT || 8081);
app.use(
    express.urlencoded({
        extended: false
    })
)

const flash = require('connect-flash');

app.use(session({ secret: 'keyboard cat' }));
app.use(flash());


app.get("/",(req,res) => {
    res.send("Welcome")
})

app.listen(app.get("port"),()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
})

app.use('/',require('./routes'));

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());