# Simple Contact Us
This is a simple Contact Us form built using NodeJS. The form should accept a user's firstname, email and message. After submitting the form, an admin user provided should be notified with the contact details, message and the timestamp of the event.

## Requirements
- NodeJS 7+

## Development

During the development, I used [mailtrap.io](https://mailtrap.io) for easy testing and checking of the email notification.

After cloning and changing your current directory to the application directory, create an .env file with the following variables.

```
PORT=3000
ADMIN_EMAIL=admin@email.com /* Where to send the email notification */
SMTP_HOST=smtp.test.com
SMTP_USER=smtpuser
SMTP_PASS=smtppass
SMTP_PORT=2525
```

After creating your local .env file, enter the following commands to run the project locally.

```
npm install
NODE_ENV=development node index.js
```

## Deployment

These instructions assumes that you already have heroku setup on your local machine already logged in with the [heroku-config plugin](https://github.com/xavdid/heroku-config) installed.

```
heroku create
heroku config:push
git push heroku master
heroku open
```

Your browser should be able to open the application on your personal heroku server after running the last command.

## License

```
MIT License

Copyright (c) 2017 Carl Dalid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
