export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "低" | "中" | "高";
  progress: number;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  description: string | null;
};

export type UserRole = "task_manager" | "commenter";

export type Profile = {
  id: string;
  name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type DailyReport = {
  id: string;
  user_id: string;
  report_date: string;
  mood: "良い" | "普通" | "悪い";
  achievements: string | null;
  challenges: string | null;
  learnings: string | null;
  next_day_goals: string | null;
  created_at: string;
};
