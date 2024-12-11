// backend/src/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware
const app = express();
app.use(bodyParser.json());

// MongoDB Connection

app.use(express.json());
app.use(cors());

let names = [];

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
  const pairs = createPairs(names);
  res.json(pairs);
});

function createPairs(names, previousPairs = []) {
  // Ensure that there are at least 3 participants
  if (names.length < 3) {
    throw new Error(
      "There should be at least 3 members in the group to draw names."
    );
  }

  // Shuffle the names array randomly

  const shuffledNames = [...names].sort(() => Math.random() - 0.5);

  // Initialize the new pairs array
  const newPairs = [];

  // Create pairs while ensuring that no one is paired with the same person
  for (let i = 0; i < shuffledNames.length; i++) {
    const giver = shuffledNames[i];
    let receiver;

    // Ensure that the receiver is not the same as the giver and doesn't repeat a previous pairing
    for (let j = 0; j < shuffledNames.length; j++) {
      receiver = shuffledNames[(i + j + 1) % shuffledNames.length];

      // Check if the current receiver has already been paired with the giver in the past
      const pairExists = previousPairs.some(
        (pair) =>
          (pair.giver === giver && pair.receiver === receiver) ||
          (pair.giver === receiver && pair.receiver === giver)
      );

      // If no previous pair exists, break the loop
      if (!pairExists) {
        break;
      }
    }

    // Create the new pair
    newPairs.push({ giver, receiver });
  }

  return newPairs;
}

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
