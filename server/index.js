require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const generatePassword = require("generate-password");

const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors({ origin: "http://frontend:3000" }));
app.use(cors);
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const secret = process.env.SECRET_KEY;

const CLIENT_ID =
  "192975288199-8vt2i27ul93u063ookgb54b2mfmuauf8.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, username, password, confirmPassword } = req.body;
    if (!email || !username || !name || !password || !confirmPassword) {
      return res.status(400).send({ message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = `INSERT INTO users(email, username, name, password) VALUES($1, $2, $3, $4) RETURNING id`;
    pool.query(
      queryText,
      [email, username, name, hashedPassword],
      (err, results) => {
        if (err) {
          return res
            .status(400)
            .send({ message: "Error registering user", error: err.message });
        }
        res
          .status(201)
          .send({ message: "User registered", userId: results.rows[0].id });
      },
    );
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res
        .status(400)
        .send({ message: "Both username and password are required." });
    }

    const querylogin = `SELECT id, password FROM users WHERE username = $1 OR email = $1`;

    pool.query(querylogin, [login], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send({ message: "Server error" });
      }
      if (results.rows.length === 0) {
        return res.status(400).send({ message: "Invalid credentials" });
      }
      const validPassword = await bcrypt.compare(
        password,
        results.rows[0].password,
      );
      if (!validPassword) {
        return res.status(400).send({ message: "Invalid Password" });
      }
      const token = jwt.sign({ login: login }, secret, { expiresIn: "1h" });
      res.send({ message: "Logged in successfully!!!", token });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Server error" });
  }
});

app.post("/api/google-login", async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await OAuth2Client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;
    const username = email;

    const queryText = "SELECT id FROM users WHERE email = $1";
    pool.query(queryText, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send({ message: "Server error" });
      }

      if (results.rows.length === 0) {
        const randomPassword = generatePassword.generate({
          length: 12,
          numbers: true,
        });
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const registerQuery = `INSERT INTO users(email, username, name, password) VALUES($1, $2, $3, $4) RETURNING id`;
        pool.query(
          registerQuery,
          [email, username, name, hashedPassword],
          (registerErr, registerResults) => {
            if (registerErr) {
              return res.status(400).send({
                message: "Error registering user",
                error: registerErr.message,
              });
            }

            const userId = registerResults.rows[0].id;
            const token = jwt.sign({ email, username, name, userId }, secret, {
              expiresIn: "1h",
            });
            res.send({ message: "Logged in successfully!!!", token });
          },
        );
      } else {
        const userId = results.rows[0].id;
        const token = jwt.sign({ email, username, name, userId }, secret, {
          expiresIn: "1h",
        });
        res.send({ message: "Logged in successfully!!!", token });
      }
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).send({ message: "Server error" });
  }
});

app.get('/api/weather', async(req, res) => {
    try {
        const city = req.query.city;
        const apiKey = '923d2efda0d24a458d564d47e50ddbf9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

        const response = await axios.get(url);
        res.json(response.data)
    }catch (err){
        res.status(500).send('Error fetching Data');
    }
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

module.exports = { app, pool };
