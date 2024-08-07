const mysql2 = require('mysql2');
require("dotenv").config();

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// connecting to the database
connection.connect((error) => {
  if (error) throw error;
  console.log("Database connection established");

  let createTable =
    "CREATE TABLE IF NOT EXISTS USERS ( email varchar(255) unique not null, password varchar(255) not null, dateOfBirth varchar(255) unique not null, nickname varchar(255) unique not null)";

  connection.query(createTable, (err) => {
    if (err) console.log("Cant create table users");
    else console.log("users table created");
  });


  let createOTP =
    "CREATE TABLE IF NOT EXISTS OTP ( email varchar(255) unique not null, otp int(6))";


  connection.query(createOTP, (err) => {
    if (err) console.log("Cant create table otp");
    else console.log("otp table created");
  });

});

module.exports = connection;
//module.exports = mysql;