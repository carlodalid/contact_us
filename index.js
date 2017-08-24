var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nodemailer  = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '10a330b546c127',
        pass: '9547a72f9180c5'
    }
});

var router = express.Router();
var dir = __dirname + '/views/';

app.use('/stylesheets',
    express.static(path.join(__dirname, 'public/stylesheets')
));

app.use('/javascripts',
    express.static(path.join(__dirname, 'public/javascripts')
));

router.use(function(request, response, next){
    console.log('/' + request.method);
    next();
});

router.get('/', function(request, response) {
    response.sendFile(dir + 'index.html');
});

router.post('/', function(request, response) {
    var firstname = request.body.name;
    var email     = request.body.email;
    var msgBody   = request.body.message;

    transporter.sendMail({
        from: firstname + " <" + email + ">",
        to: 'carlodalid@gmail.com',
        subject: 'Someone is trying to reach you!',
        html: msgBody,
    }).catch((error) => {
        console.log(error);
    });

    response.json({ success: true });
});

router.get('*', function(request, response) {
    response.sendFile(dir + '404.html');
});

app.use('/', router);

app.listen(3000, function(){
    console.log("We're live and up on port 3000");
});
