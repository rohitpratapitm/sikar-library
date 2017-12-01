var mongoose = require("mongoose");
var db = mongoose.connection;
var uri = 'mongodb://rohitpratapitm:Quarter1@cluster0-shard-00-00-7cpmb.mongodb.net:27017,cluster0-shard-00-01-7cpmb.mongodb.net:27017,cluster0-shard-00-02-7cpmb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect( process.env.MONGOHQ_URL || uri ,  {useMongoClient: true});

// Error handler
db.on('error', function (err) {
  console.log('Error is ' + err);
});

// Reconnect when closed
db.on('disconnected', function () {
  console.log('disconnected , try again');
  mongoose.connect(process.env.MONGOHQ_URL || uri,  {server:{auto_reconnect:true}});
});

// connected!
db.once('open', function callback () {
  console.log("Connected to Mongo!");
});