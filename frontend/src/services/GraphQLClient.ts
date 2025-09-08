import { Task, CreateTaskInput, UpdateTaskStatusInput, TaskStatus } from '../types/Task';

export class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private async request(query: string, variables?: any) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  }

  async getAllTasks(): Promise<Task[]> {
    const query = `
      query GetAllTasks {
        getAllTasks {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.request(query);
    return data.getAllTasks;
  }

  async getTaskById(id: number): Promise<Task | null> {
    const query = `
      query GetTaskById($id: Int!) {
        getTaskById(id: $id) {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.request(query, { id });
    return data.getTaskById;
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const mutation = `
      mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.request(mutation, { input });
    return data.createTask;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task | null> {
    const mutation = `
      mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
        updateTaskStatus(input: $input) {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.request(mutation, { 
      input: { id, status } 
    });
    return data.updateTaskStatus;
  }

  async deleteTask(id: number): Promise<boolean> {
    const mutation = `
      mutation DeleteTask($id: Int!) {
        deleteTask(id: $id)
      }
    `;

    const data = await this.request(mutation, { id });
    return data.deleteTask;
  }
}
