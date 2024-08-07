const Database = require('better-sqlite3');
require('dotenv').config();

const db = new Database('./database.sqlite', {verbose: console.log});

try { 
const createTable = `
  CREATE TABLE IF NOT EXISTS USERS ( 
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL, 
  dateOfBirth TEXT UNIQUE NOT NULL, 
  nickname TEXT UNIQUE NOT NULL
)
`;

db.prepare(createTable).run();

const createOTP = `
  CREATE TABLE IF NOT EXISTS OTP ( 
  email TEXT UNIQUE NOT NULL, 
  otp INTEGER
  )
  `;

  db.prepare(createOTP).run();

  console.log('db setup complete');
} catch (err) {
console.error('error setting up database', err);
}

  module.exports = db;

