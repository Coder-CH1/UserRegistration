const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log(dbPath, 'Database path');

let db;
try {
  db = new Database(dbPath, {verbose: console.log});
} catch (err) {
  console.error(err);
  process.exit(1);
}
//const db = new 

try { 
const createTable = `
  CREATE TABLE IF NOT EXISTS USERS ( 
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL, 
  dateOfBirth TEXT UNIQUE NOT NULL, 
  nickname TEXT UNIQUE NOT NULL
)
`;

const createOTP = `
  CREATE TABLE IF NOT EXISTS OTP ( 
  email TEXT UNIQUE NOT NULL, 
  otp INTEGER
  )
  `;

  db.prepare(createTable).run();
  db.prepare(createOTP).run();
  console.log('db setup complete');
} catch (err) {
console.error('error setting up database', err);
}

  module.exports = db;

