# Todo API

A RESTful API built with Node.js, Express, and SQLite.

## Tech Stack
- Node.js
- Express.js
- SQLite (better-sqlite3)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| POST | /todos | Create a new todo |
| PUT | /todos/:id | Update todo status |
| DELETE | /todos/:id | Delete a todo |

## Setup
```bash
npm install
node index.js
```

Server runs on http://localhost:3000