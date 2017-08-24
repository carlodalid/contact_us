require('dotenv').config();
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/stylesheets',
    express.static(path.join(__dirname, 'public/stylesheets')
));

app.use('/javascripts',
    express.static(path.join(__dirname, 'public/javascripts')
));

var index = require('./routes/index');
app.use('/', index);

app.listen(process.env.PORT || 3000, function(){
    console.log("We're live and up on port " + process.env.PORT);
});
