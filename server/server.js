const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const app = express();

// Initialize database
const db = new Database('tasks.db');

// Create tasks table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);


app.use(cors({
    origin: '*', 
    methods: ['GET','POST','DELETE','PUT','PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.get("/tasks", (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks.map(t => ({ ...t, completed: Boolean(t.completed) })));
});


app.post("/tasks", (req, res) => {
    const { text } = req.body;
    const result = db.prepare('INSERT INTO tasks (text) VALUES (?)').run(text);
    res.json({ id: result.lastInsertRowid, text, completed: false });
});


app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    db.prepare('UPDATE tasks SET text = ?, completed = ? WHERE id = ?').run(text, completed ? 1 : 0, id);
    res.json({ id, text, completed });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    res.sendStatus(204);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
