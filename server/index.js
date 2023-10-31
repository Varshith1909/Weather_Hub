require('dotenv').config();
const secret = process.env.SECRET_KEY
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(express.json());

const users = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password:hashedPassword });

    res.status(201).send({ message: "User registered" });
});

app.post('./login', async(req,res) => {
    const {username, password} = req.body;

    const user = users.find(u => u.username === username);

    if(!user){
        return res.status(400).send({message:"Invalid credentials"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.status(400).send({message:"Invalid Password"});
    }

    const token = jwt.sign({ username: user.username }, secret , { expiresIn: '1h' });

    res.send({ message: "Logged in sucessfully!!!", token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})