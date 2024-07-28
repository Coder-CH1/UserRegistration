require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session')

const secretKey = process.env.SESSION_SECRET;
app.use(bodyParser.json());
app.use(session({
secret: secretKey,
resave: false,
saveUninitialized: true,
cookie: {secure: false}
}
))
const dbConfig = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'mysql'
};
const pool = mysql.createPool(dbConfig);

app.post('/register', async (req, res) => {
    res.send('User registration successful');
    const { email, password, dateOfBirth, nickname} = req.body;
    if (!email || !password || !dateOfBirth || !nickname) {
        return res.status(404).send('All fields are required')
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password, dateOfBirth, nickname) VALUES (?,?,?,?)';
        // const[results] = pool.execute("INSERT INTO users(email, password, date_of_birth, nickname) ",
        //     VALUES(), ",[email, hashedPassword, dateOfBirth, nickname]);",
        //     res.send('user registered successfully'));
        const [results] = await pool.execute(query, [email, hashedPassword, dateOfBirth, nickname]);
res.status(201).send('User registered successfully');
    } catch(err) {
        console.log(err);
        res.status(500).send('error registering user');
    }
    });

    app.post('/login', async (req, res) => {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(401).send('Email and password are required');
        }
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const[rows] = await pool.execute(query, [email]);

            if (rows.length === 0) {
                return res.status(401).send('Invalid email or password');
            }
            const user = rows[0];
            const isValidPassword = await
            bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).send('Invalid email or password');
            }
            req.session.user = {
                id: user.id,
                email: user.email
            };
            res.send('User logged in successfully');
        } catch(err) {
            console.error(err);
            res.status(400).send('error logging in user');
        }
    });

app.post('/logout', (req, res) => {
req.session.destroy(err => {
    if (err) {
        return res.status(500).send('Error logging out user');
    }
    res.send('User logged out successfully');
});
});

app.listen(3002, () => {
    console.log('server listening on port 3001')
});
