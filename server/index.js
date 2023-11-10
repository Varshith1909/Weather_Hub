require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const secret = process.env.SECRET_KEY;

app.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).send({ message: "Both username and password are required." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		pool.query(`INSERT INTO users(username, password) VALUES($1, $2) RETURNING id`, [username, hashedPassword], (err, results) => {
			if (err) {
				return res.status(400).send({ message: "Error registering user", error: err.message });
			}
			res.status(201).send({ message: "User registered", userId: results.rows[0].id });
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

app.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).send({ message: "Both username and password are required." });
		}

		pool.query(`SELECT id, password FROM users WHERE username = $1`, [username], async (err, results) => {
			if (err) {
				console.error('Database error:', err);
				return res.status(500).send({ message: "Server error" });
			}

			if (results.rows.length === 0) {
				return res.status(400).send({ message: "Invalid credentials" });
			}

			const validPassword = await bcrypt.compare(password, results.rows[0].password);
			if (!validPassword) {
				return res.status(400).send({ message: "Invalid Password" });
			}

			const token = jwt.sign({ username: username }, secret, { expiresIn: '1h' });
			console.log(`${username} logged in successfully!`);
			res.send({ message: "Logged in successfully!!!", token });
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).send({ message: "Server error" });
	}
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
module.exports = app;