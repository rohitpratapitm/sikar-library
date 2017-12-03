const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const db = require("./mongo");
const cors = require('express-cors');

app.use(express.static(__dirname + '/dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Override'));

app.get('*', function(req, res) {
    console.error('inside join');
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})
app.listen(process.env.PORT || 8080);
console.log('Console listening!');