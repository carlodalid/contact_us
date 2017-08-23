var express = require('express');
var path = require('path');
var app = express();

var router = express.Router();
var dir = __dirname + '/views/';

app.use('/stylesheets',
    express.static(path.join(__dirname, 'public/stylesheets')
));

router.use(function(request, response, next){
    console.log('/' + request.method);
    next();
});

router.get('/', function(request, response) {
    response.sendFile(dir + 'index.html');
});

router.get('*', function(request, response) {
    response.sendFile(dir + '404.html');
});

app.use('/', router);

app.use('*', function(request, response){
    response.sendFile(path + '404.html');
});

app.listen(3000, function(){
    console.log("We're live and up on port 3000");
});
