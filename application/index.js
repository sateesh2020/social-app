var express       = require('express');
var app           = express();
var path          = require('path');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var sessionConfig = session({secret: 'T0p$3c63t',resave: false,saveUninitialized:true});
var mongoose      = require('mongoose');
var dbName        = 'socialApp';
var dbUrl         = 'mongodb://localhost:27017/'+dbName;


app.use(express.static('client'));
app.use(sessionConfig);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});


var server = app.listen(3005, function() {
  console.log('App listening at http://localhost:3005');
});

/****************
Connecting to DB
*****************/
mongoose.connect(dbUrl);
var db                  = mongoose.connection;
db.on('error', function(error){
    console.log('Error in Connecting to DB');
});
db.once('open', function (callback) {
  console.log('Connected to DB');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require(path.join(__dirname + '/server/config/routes'))(app);
