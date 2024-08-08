const Router = require('express').Router();
const sqlite = require('../config/db');


Router.get('/',(req,res)=>{
  res.render('otp')
})

Router.post('/',(req,res)=>{
    let email = req.body.email;
    let otp = req.body.otp;

   let searchQuery = `SELECT otp FROM OTP WHERE email = ?`;

   try {
    const stmt = sqlite.prepare(searchQuery);
    const result = stmt.get(email);

    if (result && result.otp == otp) {
      res.status(200).render('success');

    } else {
      res.status(400).json({
        message: 'invalid otp',
      });
    }
   } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message || '',
    });
   }
});

module.exports = Router;