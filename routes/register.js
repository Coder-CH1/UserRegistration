const Router = require('express').Router();
//const users = require('../model/users');
const {createSecurePassword} = require('../model/users');
const sqlite = require('../config/db');

require('dotenv').config();

Router.post('/', (req, res) => {
let email = req.body.email;
let password = req.body.password;
let hassedPassword = createSecurePassword(password, '');
let dateOfBirth = req.body.dateOfBirth;
let nickname = req.body.nickname;

let q = `
INSERT INTO USERS (email , hassedPassword , dateOfBirth, nickname)
VALUES (?,?,?,?)
`;
try {
    const stmt = sqlite.prepare(q);
    stmt.run(email, hassedPassword, dateOfBirth, nickname);
    console.log('user registered');
    res.status(200).json({
message: `user ${email} registered successfully`
    });
} catch (err) {
    console.error(err);
    res.status(400).json({
message: err.message || '',
    });
}
});

module.exports = Router;