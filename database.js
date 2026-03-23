const Database = require('better-sqlite3'); //we are importing the package we have installed. require is Node's way of pulling in external code.
const db = new Database('todos.db'); //this creates a file called todos.db on your computer. that file is your database. open your folder after running the code- you will see it appear.

db.exec(`
  CREATE TABLE IF NOT EXISTS todos ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0
    )
`); // this runs a SQL command directly on the database
// //CREATE TABLE IF NOT EXISTS todos
// — "Create a table called todos — but only if it doesn't already exist." Without IF NOT EXISTS, this would crash every time you restart.
// id INTEGER PRIMARY KEY AUTOINCREMENT
// — Every row gets a unique ID automatically. You never set this manually — the database handles it.
// title TEXT NOT NULL
// — The todo's text. NOT NULL means you can't create a todo without a title. The database enforces this rule for you.
// completed INTEGER DEFAULT 0
// — SQLite has no boolean type. So 0 = false, 1 = true. Starts as 0 (not completed) by default.

module.exports = db;//makes this database connection available to other files that need it