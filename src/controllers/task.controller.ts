import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';

// In-memory store — replace with a database in production
const tasks: Task[] = [];

// Valid task status values for query validation
const VALID_STATUSES: TaskStatus[] = ['pending', 'in_progress', 'completed'];

/**
 * GET /tasks
 * Returns all tasks. Supports optional ?status= filter.
 * Responds with 400 if an invalid status value is provided.
 *
 * Examples:
 *   GET /tasks                      → all tasks
 *   GET /tasks?status=pending       → only pending tasks
 *   GET /tasks?status=in_progress   → only in-progress tasks
 *   GET /tasks?status=completed     → only completed tasks
 */
export const getAllTasks = (req: Request, res: Response): void => {
  const { status } = req.query;

  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status as TaskStatus)) {
      res.status(400).json({
        error: `Invalid status value: "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`,
      });
      return;
    }
    const filtered = tasks.filter((t) => t.status === status);
    res.json(filtered);
    return;
  }

  res.json(tasks);
};

/**
 * GET /tasks/:id
 * Returns a single task by ID.
 */
export const getTaskById = (req: Request, res: Response): void => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  res.json(task);
};

/**
 * POST /tasks
 * Creates a new task.
 */
export const createTask = (req: Request, res: Response): void => {
  const { title, description, status, dueDate }: CreateTaskDTO = req.body;

  if (!title || !description) {
    res.status(400).json({ error: 'title and description are required' });
    return;
  }

  const now = new Date().toISOString();
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    status: status ?? 'pending',
    dueDate,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

/**
 * PATCH /tasks/:id
 * Updates an existing task partially.
 */
export const updateTask = (req: Request, res: Response): void => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  const updates: UpdateTaskDTO = req.body;
  const existing = tasks[index];

  tasks[index] = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  res.json(tasks[index]);
};

/**
 * DELETE /tasks/:id
 * Deletes a task by ID.
 */
export const deleteTask = (req: Request, res: Response): void => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).send();
};
