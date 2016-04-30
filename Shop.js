var http = require('http');
var express = require('express');
var engine = require('ejs-locals');
var exphbs = require('express-handlebars');
var path = require("path");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var busboy = require('connect-busboy');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();
require('./Shop/Routes/passport')(passport);
var info = require('./package.json');
//...
app.use(busboy());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'shop/views/'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/shop/Public')));
app.use(express.static(path.join(__dirname, '/shop/router')));
app.use(express.static(path.join(__dirname, 'layouts')));
app.use(express.static(path.join(__dirname, '/admin/Routes')));
//app.use(express.static(path.join(__dirname, '/')));
// Set up sessions


app.use(session({
    cookie: { maxAge: new Date(Date.now() + 181440000) },
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


var routers = require('./shop/router')(app, passport);
//app.use('/', routers);


// Listen for requests
//app.listen(process.env.PORT);

//console.log('NodeShop v' + info.version + ' listening on port ' + process.env.PORT);
app.listen(2001, function (req, res) {
    console.log("ready for running on the port 2001");
})

// Handle all uncaught errors
process.on('uncaughtException', function(err) {
    console.log(err);
});