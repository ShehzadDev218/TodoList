export enum TaskStatus {
  Pending = 'PENDING',
  Completed = 'COMPLETED'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskStatusInput {
  id: number;
  status: TaskStatus;
}
