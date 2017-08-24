require('dotenv').config();
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nodemailer  = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
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
    var currentTimeStamp = new Date().toISOString().
                            replace(/T/, ' ').
                            replace(/\..+/, '');
 
    var firstname = request.body.name;
    var email     = request.body.email;
    var msgBody   = "<p>Someone just sent you an email</p><p>Sent on: " + currentTimeStamp + "</p>";
    msgBody      += "<p>" + request.body.message + "</p>";

    transporter.sendMail({
        from: firstname + " <" + email + ">",
        to: process.env.ADMIN_EMAIL,
        subject: 'Someone is trying to reach you!',
        html: msgBody,
    }).catch((error) => {
        response.status(500).json({ msg: 'Something went wrong!' })
    });

    response.json({ msg: 'Thank you for contacting us!' });
});

router.get('*', function(request, response) {
    response.sendFile(dir + '404.html');
});

app.use('/', router);

app.listen(process.env.PORT || 3000, function(){
    console.log("We're live and up on port " + process.env.DEFAULT_PORT);
});
