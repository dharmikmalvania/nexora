import { DashboardResponse } from "./dashboard.types";

export class DashboardService {
  async getDashboard(user: {
    id: number;
    fullName: string;
    username: string;
    email: string;
  }): Promise<DashboardResponse> {
    return {
      user,

      stats: {
        subjects: 0,
        notes: 0,
        tasks: 0,
        completedTasks: 0,
      },

      streak: {
        current: 0,
      },

      recentActivity: [],

      quote:
        "Small progress every day is better than perfection someday.",
    };
  }
}

export const dashboardService = new DashboardService();