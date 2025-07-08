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

export interface User {
  id: string;
  name: string;
  email: string;
  role: "task_manager" | "commenter";
}

export type DailyReport = {
  id: string;
  user_id: string;
  title: string;
  mood: "良い" | "普通" | "悪い" | "smile" | "normal" | "sad"; // `face` カラムに対応
  achievements: string; // `good_thing` カラムに対応
  challenges: string; // `bad_thing` カラムに対応
  learnings: string; // `message` カラムに対応
  next_day_goals: string; // 将来的な拡張用
  report_date: string;
  created_at: string;
  updated_at: string;
};
