import { Task } from "./definitions";

export const dummyTasks: Task[] = [
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

export const getAllTasks = async (): Promise<Task[]> => {
  // In a real application, you would fetch this data from a database.
  // For now, we're returning the dummy data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyTasks);
    }, 500); // Simulate network latency
  });
};
