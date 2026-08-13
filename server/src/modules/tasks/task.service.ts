import { workspaceRepository } from "../workspace/workspace.respository";
import { taskRepository } from "./task.repository";
import {
  CreateTaskInput,
  UpdateTaskInput,
} from "./task.validation";

export class TaskService {
  async create(
    userId: number,
    workspaceId: number,
    data: CreateTaskInput
  ) {
    const workspace =
      await workspaceRepository.findById(
        workspaceId,
        userId
      );

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return taskRepository.create({
      title: data.title,
      description: data.description,
      status: data.status ?? "TODO",
      priority: data.priority ?? "MEDIUM",
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : undefined,
      workspaceId,
      userId,
    });
  }

  async getAll(
    userId: number,
    workspaceId: number
  ) {
    const workspace =
      await workspaceRepository.findById(
        workspaceId,
        userId
      );

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return taskRepository.findAllByWorkspace(
      workspaceId,
      userId
    );
  }

  async getById(
    userId: number,
    id: number
  ) {
    const task =
      await taskRepository.findById(
        id,
        userId
      );

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async update(
    userId: number,
    id: number,
    data: UpdateTaskInput
  ) {
    const task =
      await taskRepository.findById(
        id,
        userId
      );

    if (!task) {
      throw new Error("Task not found");
    }

    return taskRepository.update(
      id,
      userId,
      {
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate)
          : undefined,
      }
    );
  }

  async delete(
    userId: number,
    id: number
  ) {
    const task =
      await taskRepository.delete(
        id,
        userId
      );

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }
}

export const taskService = new TaskService();