import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';

// In-memory store — replace with a database in production
const tasks: Task[] = [];

/**
 * GET /tasks
 * Returns all tasks. Supports optional ?status= filter.
 */
export const getAllTasks = (req: Request, res: Response): void => {
  const { status } = req.query;

  if (status) {
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
