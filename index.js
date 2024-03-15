const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();

const port =  8000;

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

app.get("/all_dua_cat/:cat_id", (req, res) => {
  const cat_id = req.params.cat_id;
  const query = "SELECT * FROM dua WHERE cat_id = ?";
  db.all(query, [cat_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/all_dua_subcat/:subcat_id", (req, res) => {
  const subcat_id = req.params.subcat_id;
  const query = "SELECT * FROM dua WHERE subcat_id = ?";
  db.all(query, [subcat_id], (err, rows) => {
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
