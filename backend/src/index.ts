import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import mysql, { Connection } from "mysql2";
import { initializeDatabase } from "../db/dbInitialize";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Initialize the database and tables
initializeDatabase();

let names: string[] = [];

// Database connection setup

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "secret_santa",
});

db.connect((err: Error | null) => {
  if (err) throw err;
  console.log("Connected to the database");
});

// Define the routes as you did previously

app.get("/get-names", (req: Request, res: Response) => {
  res.json(names);
});

app.post("/add-name", (req: Request, res: Response) => {
  const { name } = req.body;
  if (names.some((n) => n.toLowerCase() === name.toLowerCase())) {
    res.status(400).json({ message: "Name already exists" });
  }
  names.push(name);
  res.send({ message: "Name added", names });
});

app.post("/create-pairs", (req: Request, res: Response) => {
  const { names } = req.body;
  if (names.length < 3) {
    throw new Error("At least 3 participants are required");
  }
  const shuffledNames = [...names].sort(() => Math.random() - 0.5);
  const pairs = shuffledNames.map((name, index) => ({
    giver: name,
    receiver: shuffledNames[(index + 1) % names.length],
  }));

  const groupId = uuidv4();
  pairs.forEach((pair) => {
    db.query(
      "INSERT INTO secret_santa_pairs (groupId, giver, receiver) VALUES (?, ?, ?)",
      [groupId, pair.giver, pair.receiver],
      (err: Error | null) => {
        if (err) {
          console.error("Error saving pair:", err);
          res.status(500).json({ message: "Failed to save pairs" });
        }
      }
    );
  });
  res.status(200).json({ message: "Pairs created successfully", groupId });
});

app.get("/api/get-receiver/:groupId", (req: Request, res: Response) => {
  const groupId = req.params.groupId;
  const { firstName, lastName } = req.query;
  const fullName = `${firstName} ${lastName}`;

  db.query(
    "SELECT receiver FROM secret_santa_pairs WHERE groupId = ? AND LOWER(giver) = LOWER(?)",
    [groupId, firstName],
    (err: Error | null, result: any) => {
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
