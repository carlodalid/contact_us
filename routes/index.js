require('dotenv').config();
var express = require('express');
var router  = express.Router();

var nodemailer  = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.use(function(request, response, next){
    console.log('/' + request.method);
    next();
});

router.get('/', function(request, response) {
    response.render('index', { title: 'Appiloque Contact Us' });
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
    response.render('404', { title: '404 Not Found' });
});

module.exports = router;
