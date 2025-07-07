export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "高" | "中" | "低";
  progress: number;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  description: string;
};
