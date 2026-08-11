import { workspaceRepository } from "../workspace/workspace.respository";
import { noteRepository } from "./note.repository";
import {
  CreateNoteInput,
  UpdateNoteInput,
} from "./note.validation";

export class NoteService {
  async create(
    userId: number,
    workspaceId: number,
    data: CreateNoteInput
  ) {
    const workspace =
      await workspaceRepository.findById(
        workspaceId,
        userId
      );

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return noteRepository.create({
      title: data.title,
      content: data.content,
      isPinned: data.isPinned ?? false,
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

    return noteRepository.findAllByWorkspace(
      workspaceId,
      userId
    );
  }

  async getById(
    userId: number,
    id: number
  ) {
    const note =
      await noteRepository.findById(
        id,
        userId
      );

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  }

  async update(
    userId: number,
    id: number,
    data: UpdateNoteInput
  ) {
    const note =
      await noteRepository.findById(
        id,
        userId
      );

    if (!note) {
      throw new Error("Note not found");
    }

    return noteRepository.update(
      id,
      userId,
      data
    );
  }

  async delete(
    userId: number,
    id: number
  ) {
    const note =
      await noteRepository.delete(
        id,
        userId
      );

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  }
}

export const noteService = new NoteService();