const Router = require('express').Router();
const users = require('../model/users');
const {createSecurePassword} = require('../model/users');
const sqlite = require('../config/db');

require('dotenv').config();

Router.post('/', (req, res) => {
let email = req.body.email;
let password = req.body.password;
let hassedPassword = createSecurePassword(password, '');
let dateOfBirth = req.body.dateOfBirth;
let nickname = req.body.nickname;

let q = `INSERT INTO USERS VALUES('${email}' , '${hassedPassword}' , '${dateOfBirth}' , '${nickname}')`;
sql.query(q, (err, result) => {
if (err) {
    console.log(err.code + 'user already exists');
    res.status(400).json({
        message : err.code + 'user already exists'
    });
} else {
    console.log('User registered');
    res.status(200).json({
        message : `User ${email} registered successfully`,
    });
}
});
});

module.exports = Router;