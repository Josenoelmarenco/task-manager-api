# Task Manager API

A RESTful API for managing tasks, built with **Node.js**, **TypeScript**, and **Express**.  
Designed with clean architecture, typed data models, and a professional GitHub workflow.

---

## Tech stack

- **Runtime:** Node.js
- **Language:** TypeScript (strict mode)
- **Framework:** Express
- **ID generation:** UUID v4

---

## Features

- Create, read, update, and delete tasks (full CRUD)
- Filter tasks by status (`pending`, `in_progress`, `completed`)
- Typed request/response handling with TypeScript interfaces
- Centralized error handling middleware
- Clean folder structure (models / controllers / routes / middleware)

---

## Project structure

```
task-manager-api/
├── src/
│   ├── controllers/      # Business logic
│   ├── middleware/        # Error handling
│   ├── models/            # TypeScript interfaces and types
│   ├── routes/            # Express route definitions
│   └── index.ts           # App entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/Josenoelmarenco/task-manager-api.git
cd task-manager-api
npm install
```

### Run in development mode

```bash
npm run dev
```

The server starts at `http://localhost:3000`.

---

## API reference

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks?status=pending` | Filter by status |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Set up CI pipeline",
    "description": "Configure GitHub Actions for automated testing",
    "status": "pending",
    "dueDate": "2026-05-20"
  }'
```

**Response:**
```json
{
  "id": "a3f1c2d4-...",
  "title": "Set up CI pipeline",
  "description": "Configure GitHub Actions for automated testing",
  "status": "pending",
  "dueDate": "2026-05-20",
  "createdAt": "2026-05-07T10:00:00.000Z",
  "updatedAt": "2026-05-07T10:00:00.000Z"
}
```

### Update a task

```bash
curl -X PATCH http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{ "status": "in_progress" }'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/<id>
```

---

## Task schema

```typescript
interface Task {
  id: string;           // UUID v4
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;     // ISO 8601 date (optional)
  createdAt: string;    // ISO 8601 timestamp
  updatedAt: string;    // ISO 8601 timestamp
}
```

---

## What I learned building this

- Structuring a TypeScript Node.js project with separation of concerns
- Using TypeScript interfaces and DTOs for type-safe request handling
- Organizing an Express app with routers and middleware layers
- Writing clean, readable code with consistent naming conventions
- Managing a project with GitHub Issues, branches, and Pull Requests

---

## Roadmap

- [ ] Add persistent storage (SQLite or PostgreSQL)
- [ ] Add input validation with Zod
- [ ] Add unit tests with Jest
- [ ] Add authentication (JWT)
- [ ] Deploy to Railway or Render

---

## Author

**José Noel Marenco**  
Software Engineering student @ Metropolia UAS, Finland  
[GitHub](https://github.com/Josenoelmarenco)
