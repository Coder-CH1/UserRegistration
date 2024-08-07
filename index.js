
require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const path=require('path');
const fs=require('fs');

const PORT = process.env.PORT || 3004;

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const validateOTP = require('./routes/otp');
const logoutRoute = require('./routes/logout');

const logStream=fs.createWriteStream(path.join(__dirname, 'server.log'), {flags: 'a'});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
res.render('register');
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/otp', validateOTP);

app.listen(PORT, () => {
 console.log(`Server listening on port: : ${PORT}`)
});