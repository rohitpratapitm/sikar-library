const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy-middleware');


// const methodOverride = require('method-override');
// const db = require("./mongo");
const cors = require('express-cors');

app.use(express.static(__dirname + '/dist'));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
// app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Override'));
const API_REWRITE_RULE = {"^/api": ""}
// Add middleware for http proxying 
const authRule = httpProxy('/oauth2',
    {
        target: 'https://api.login.yahoo.com',
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    });
app.use('/oauth2', authRule);

const apiRule = httpProxy('/api',
    {
        target: 'https://fantasysports.yahooapis.com/fantasy/v2',
        secure: false,
        changeOrigin: true,
        pathRewrite: API_REWRITE_RULE,
        logLevel: "debug"
    });
app.use('/api', apiRule);

app.get('*', function(req, res) {
    console.error('inside join');
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 80);
console.log('Console listening!');