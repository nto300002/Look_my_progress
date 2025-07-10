export type Task = {
  id: string;
  user_id: string;
  title: string;
  detail: string | null;
  priority: "big" | "medium" | "small";
  deadline: string | null;
  status: "todo" | "done";
  created_at: string;
  updated_at: string;
  // description, progress, startDateなどは新しいスキーマにないため削除
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

export type Comment = {
  id: string;
  report_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type CommentWithProfile = Comment & {
  profiles?: {
    name: string | null;
  };
};

export type Tag = {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type TaskTag = {
  id: string;
  task_id: string;
  tag_id: string;
  created_at: string;
  updated_at: string;
};

export type TaskWithTags = Task & {
  tags?: Tag[];
};
