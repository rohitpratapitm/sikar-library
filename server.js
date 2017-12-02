const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require("./mongo");
const cors = require('express-cors');

app.use(express.static(__dirname + '/dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors({
    allowedOrigins: [
        'https://sikar-library.herokuapp.com', 
        'https://sikar-library.herokuapp.com/login', 
        'sikar-library.herokuapp.com',
        'sikar-library.herokuapp.com/login',
        'http://evil.com/',
        'api.login.yahoo.com'
    ]
 }));
 app.use(function(req, res, next) {
     console.log('Inside server.js ');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('*', function(req, res) {
    console.error('inside join');
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})
app.listen(process.env.PORT || 8080);
console.log('Console listening!');