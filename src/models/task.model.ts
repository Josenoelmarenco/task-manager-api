export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string; // ISO 8601 date string, e.g. "2026-05-20"
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
}
