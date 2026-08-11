export interface WorkspaceUser {
  id: number;
}

export interface WorkspaceResponse {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  goal: string | null;
  icon: string;
  color: string;
  category: string;
  isFavorite: boolean;
  archived: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}