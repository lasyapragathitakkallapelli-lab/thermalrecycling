const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./materials.db");

const materials = [
  { title: "Intro to Pyrolysis", url: "https://example.com/pyrolysis" },
  { title: "Bioplastics Overview", url: "https://example.com/bioplastics" }
];

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS materials (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT)");
  const stmt = db.prepare("INSERT INTO materials (title, url) VALUES (?, ?)");
  materials.forEach(m => stmt.run(m.title, m.url));
  stmt.finalize(() => {
    console.log("Database seeded ✅");
    db.close();
  });
});
