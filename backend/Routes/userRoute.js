
const express = require("express");
const jwt = require('jsonwebtoken'); 
 const bcrypt = require("bcryptjs");
const { verifyToken } = require("../auth.middleware");
const db = require("../config/connection");

const jwtSecret = 'key'

const route = express();
route.get("/home", verifyToken, (req, res)=>{
  res.send({msg:"this is the home page"})
})

route.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Please fill all fields');
  }

  // Check if user exists
  db.query('SELECT * FROM userlogins WHERE username = ?', [username], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  });
});


route.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    // Check if user already exists
    db.query(
      "SELECT username FROM userlogins WHERE username = ? OR email = ?",
      [username, email],
      async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          return res.status(409).send("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user
        db.query(
          "INSERT INTO userlogins (username, password, email) VALUES (?, ?, ?)",
          [username, hashedPassword, email],
          (err, result) => {
            if (err) throw err;
            res.status(201).send("User registered successfully");
          }
        );
      }
    );
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = {
  route
}