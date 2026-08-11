import { workspaceRepository } from "./workspace.respository";
import { CreateWorkspaceInput } from "./workspace.validation";

export class WorkspaceService {
  async create(
    userId: number,
    data: CreateWorkspaceInput
  ) {
    const slug = this.generateSlug(data.name);

    const existingWorkspace =
      await workspaceRepository.findBySlug(slug, userId);

    if (existingWorkspace) {
      throw new Error("Workspace with this name already exists");
    }

    return workspaceRepository.create({
      name: data.name,
      slug,
      description: data.description,
      goal: data.goal,
      icon: data.icon ?? "book",
      color: data.color ?? "#3B82F6",
      category: data.category,
      userId,
    });
  }

  async getAll(userId: number) {
    return workspaceRepository.findAllByUser(userId);
  }

  async getById(userId: number, id: number) {
    const workspace =
      await workspaceRepository.findById(id, userId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  async update(
    userId: number,
    id: number,
    data: Partial<CreateWorkspaceInput>
  ) {
    const workspace =
      await workspaceRepository.findById(id, userId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    let updateData: Partial<typeof workspace> = {
      ...data,
    };

    if (data.name && data.name !== workspace.name) {
      const slug = this.generateSlug(data.name);

      const existing =
        await workspaceRepository.findBySlug(slug, userId);

      if (existing && existing.id !== id) {
        throw new Error(
          "Workspace with this name already exists"
        );
      }

      updateData.slug = slug;
    }

    return workspaceRepository.update(
      id,
      userId,
      updateData
    );
  }

  async delete(userId: number, id: number) {
    const workspace =
      await workspaceRepository.delete(id, userId);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

export const workspaceService = new WorkspaceService();