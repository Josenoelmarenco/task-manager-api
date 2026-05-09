import express from 'express';
import taskRoutes from './routes/task.routes';
import { notFound, errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (_req, res) => {
  res.json({
    message: 'Task Manager API',
    version: '1.0.0',
    endpoints: {
      'GET    /tasks': 'List all tasks (optional ?status=pending|in_progress|completed)',
      'GET    /tasks/:id': 'Get task by ID',
      'POST   /tasks': 'Create a new task',
      'PATCH  /tasks/:id': 'Update a task',
      'DELETE /tasks/:id': 'Delete a task',
    },
  });
});

app.use('/tasks', taskRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
