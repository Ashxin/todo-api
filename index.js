const express = require('express');//creates our server, like turning on the engiene
const db = require('./database');

const app = express();
app.use(express.json());//By default, Express can't read JSON from request bodies. This middleware tells Express: "parse incoming JSON so I can use it as a JS object." Without this, req.body is undefined.

app.get('/todos', (req, res) => { //"When someone sends a GET request to /todos, run this function." The function receives the request (req) and the response (res).
  const todos = db.prepare('SELECT * FROM todos').all();//Prepares a SQL query, then .all() runs it and returns every row as an array of objects.
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({error: 'Title is required'});
  }

  const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');//The ? is a placeholder. Never concatenate user input directly into SQL strings — that's how SQL injection attacks happen. The ? is safe.
  const result = stmt.run(title);//Executes the insert, replacing ? with the actual title.

  res.status(201).json({ id: result.lastInsertRowid, title, completed: 0});//The database tells you the ID it assigned to the new row. Send it back to the client.
});

app.delete('/todos/:id', (req, res) => {
  const {id} = req.params;

  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const result = stmt.run(id);

  if(result.changes === 0) {
    return res.status(404).json({error: 'Todo not found'});
  }

  res.status(200).json({ message: 'Todo deleted successfully' });
});

app.put('/todos/:id', (req, res) => {
 
  const { completed } = req.body;
  const {id} = req.params;

  if (completed === undefined) {
    return res.status(400).json({error: 'completed field is required'});
  }

  const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
  const result = stmt.run(completed, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json({ message: 'Todo updated successfully' });
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});