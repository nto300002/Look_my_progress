import { DailyReport, User, Task } from "./definitions";

// Users Data
export const users: User[] = [
  {
    id: "user-1",
    name: "yasuda naoto",
    email: "user1@example.com",
    role: "task_manager",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "user2@example.com",
    role: "commenter",
  },
];

// Tasks Data
export const tasks: Task[] = [
  {
    id: "task-1",
    title: "タスク1：共通レイアウトの実装",
    status: "done",
    priority: "高",
    progress: 100,
    startDate: "2024-07-05",
    dueDate: "2024-07-08",
    createdAt: "2024-07-01",
    description: `Figmaのデザインカンプに基づき、共通レイアウトを実装する。

# 1. 実装方針
- PC/SPのレスポンシブ対応
- Atomic Designを参考にコンポーネントを分割

## 2. 実装コンポーネント
- **ヘッダー**: ロゴ、ナビゲーションリンク、認証状態に応じたボタン表示
- **フッター**: コピーライト情報、プライバシーポリシーへのリンク
- **ヒーローセクション**: キャッチコピーとCTAボタンを配置
- [ ] ヘッダーのロゴをクリックするとトップページにリダイレクトする`,
  },
  {
    id: "task-2",
    title: "タスク2：タスク一覧ページの作成",
    status: "in-progress",
    priority: "中",
    progress: 50,
    startDate: "2024-07-07",
    dueDate: "2024-07-10",
    createdAt: "2024-07-02",
    description: "タスクの一覧表示、フィルタリング、ソート機能を実装する。",
  },
  {
    id: "task-3",
    title: "タスク3：認証機能の実装",
    status: "done",
    priority: "高",
    progress: 100,
    startDate: "2024-07-01",
    dueDate: "2024-07-03",
    createdAt: "2024-06-25",
    description:
      "Supabaseを利用して、メールアドレスとパスワードによる認証機能を実装する。",
  },
  {
    id: "task-4",
    title: "タスク4：日報作成機能",
    status: "todo",
    priority: "低",
    progress: 0,
    startDate: null,
    dueDate: null,
    createdAt: "2024-07-12",
    description: "",
  },
  {
    id: "task-5",
    title: "タスク5：ワイヤーフレーム作成",
    status: "done",
    priority: "中",
    progress: 100,
    startDate: "2024-06-25",
    dueDate: "2024-06-28",
    createdAt: "2024-06-20",
    description: "Figmaで主要画面のワイヤーフレームを作成する。",
  },
];

// ダミーデータ取得用の関数
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(users), 500));
};

export const getDailyReportsByUserId = async (
  userId: string
): Promise<DailyReport[]> => {
  console.log("Fetching daily reports for user:", userId, "from dummy data.");
  // This function will be replaced with a real DB access later.
  // For now, it returns an empty array until Supabase connection is complete.
  return new Promise((resolve) => setTimeout(() => resolve([]), 500));
};

export const getTasks = async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return tasks;
};
