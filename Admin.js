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

//...
app.use(busboy()); 
//require('./Core/passport')(passport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'admin/views/'));
//app.engine('handlebars', exphbs({ defaultLayout: 'Layout' }));
//app.set('view engine', 'handlebars');

//app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'Layout.hbs' }));
//app.set('views', path.join(__dirname, 'admin/views/'));
//app.set('view engine', 'hbs');


//app.set('views', path.join(__dirname, 'admin/views/'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/admin/Public')));
app.use(express.static(path.join(__dirname, '/admin/router')));
app.use(express.static(path.join(__dirname,'layouts')));


var routers = require('./admin/router');
app.use('/', routers);

//var categories = require("./admin/Routes/categories");
//var main = require("./admin/Routes/main");

// Main routes
//app.get('/', main.getHome);


// Categories
//app.get('/categories', categories.getHome);
//app.get('/categories/new', categories.getNew);
//app.post('/categories/new', categories.Save);
//app.get('/categories/:id', categories.getByID);
//app.post('/categories/:id', categories.Update);
//app.get('/categories/remove/:id', categories.Remove);

//var routers = require('./admin/router');
//app.use('/', routers);

app.listen(2000, function (req, res) {
    console.log("ready for running on the port 2000");
})