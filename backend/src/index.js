// backend/src/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
// Middleware
const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

let names = [];

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "", // replace with your MySQL password
  database: "secret_santa",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});
app.post("/add-name", (req, res) => {
  const { name } = req.body;
  if (names.some((n) => n.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: "Name already exists" });
  }
  names.push(name);
  res.send({ message: "Name added", names });
});

app.get("/get-names", (req, res) => {
  res.json(names);
});

app.post("/create-pairs", (req, res) => {
  const { names } = req.body;
  // Ensure that there are at least 3 participants
  if (names.length < 3) {
    throw new Error("At least 3 participants are required");
  }
  // Shuffle the names array randomly
  const shuffledNames = [...names].sort(() => Math.random() - 0.5);

  // Initialize the new pairs array

  const pairs = shuffledNames.map((name, index) => ({
    giver: name,
    receiver: shuffledNames[(index + 1) % names.length], // Circular pairing
  }));

  const groupId = uuidv4();
  pairs.forEach((pair) => {
    db.query(
      "INSERT INTO secret_santa_pairs (groupId, giver, receiver) VALUES (?, ?, ?)",
      [groupId, pair.giver, pair.receiver],
      (err, result) => {
        if (err) {
          console.error("Error saving pair:", err);
          res.status(500).json({ message: "Failed to save pairs" });
        }
      }
    );
  });
  res.status(200).json({ message: "Pairs created successfully", groupId });
});

app.get("/api/get-receiver/:groupId", (req, res) => {
  const groupId = req.params.groupId;
  const { firstName, lastName } = req.query;
  const fullName = `${firstName} ${lastName}`;

  db.query(
    "SELECT receiver FROM secret_santa_pairs WHERE groupId = ? AND LOWER(giver) = LOWER(?)",
    [groupId, firstName],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching receiver" });
      }

      if (result.length > 0) {
        res.status(200).json({ receiver: result[0].receiver });
      } else {
        res.status(404).json({ message: "No match found" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
