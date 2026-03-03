const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Database connection
const db = new sqlite3.Database(path.join(__dirname, "materials.db"));
db.run(`CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  url TEXT
)`);

// Fetch all materials
app.get("/api/materials", (req, res) => {
  db.all("SELECT * FROM materials ORDER BY id DESC", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Add new material
app.post("/api/materials", (req, res) => {
  const { title, url } = req.body;
  db.run("INSERT INTO materials (title, url) VALUES (?, ?)", [title, url], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID, title, url });
  });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

