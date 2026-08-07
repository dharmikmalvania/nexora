export interface DashboardStats {
  subjects: number;
  notes: number;
  tasks: number;
  completedTasks: number;
}

export interface DashboardResponse {
  user: {
    id: number;
    fullName: string;
    username: string;
    email: string;
  };

  stats: DashboardStats;

  streak: {
    current: number;
  };

  recentActivity: string[];

  quote: string;
}