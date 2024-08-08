const Router = require('express').Router();
const users = require('../model/users');
const {createSecurePassword } = require('../model/users');
const {sendEmail} = require('../config/nodemailer');
const sqlite = require('../config/db');

require('dotenv').config();

const generateOTP = ( ) => {
    //always generate 6 digit otp
    return Math.floor(100000 + Math.random() * 900000) ;
}



Router.get('/',(req,res)=>{
    res.render('login');
});

Router.post('/',(req,res,next)=>{
     const email = req.body.email;
     const otp = generateOTP();

     const emailQuery = `
     SELECT EMAIL FROM USERS WHERE email = ?
     `;
try {
    const stmt = sqlite.prepare(emailQuery);
    const user = stmt.get(email);

    if (!user) {
        res.status(400).json({
            message: 'user not found'
        });
        return;
    }
    sendEmail(email, otp);
    const otpQuery = `
        INSERT OR REPLACE INTO OTP (email, otp)
        VALUES (?, ?)
    `;

    const otpStmt = sqlite.prepare(otpQuery);
    otpStmt.run(email, otp);

    console.log('OTP Sent');
    res.status(200).redirect('/otp');

} catch (err) {
    console.error(err);
    res.status(500).json({
        message: err.message || '',
    });
}
});



module.exports  = Router;