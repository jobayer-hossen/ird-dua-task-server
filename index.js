const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

let db = new sqlite3.Database(
  "./databaseFile/dua_main.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

app.get("/category", (req, res) => {
  const query = "SELECT * FROM 'category' LIMIT 0,30";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.get("/all_dua", (req, res) => {
  const query = "SELECT * FROM 'dua' LIMIT 0,253";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.get("/sub_category", (req, res) => {
  const query = "SELECT * FROM 'sub_category' LIMIT 0,30";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.get("/", (req, res) => {
  res.send("IRD dua server running");
});

app.listen(port, () => {
  console.log(`IRD dua server running on terminal : ${port}`);
});
