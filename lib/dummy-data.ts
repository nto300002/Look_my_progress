import { Task, DailyReport } from "./definitions";

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

export const dummyReports: DailyReport[] = [
  {
    id: "report-1",
    user_id: "user-1",
    report_date: "2024-07-20",
    mood: "良い",
    achievements: "日報一覧ページの実装を完了した。",
    challenges: "TypeScriptの型エラーで少し詰まった。",
    learnings: "shadcn/uiのTableコンポーネントの使い方がわかった。",
    next_day_goals: "日報の詳細ページを作成する。",
    created_at: "2024-07-20T18:00:00Z",
  },
  {
    id: "report-2",
    user_id: "user-1",
    report_date: "2024-07-19",
    mood: "普通",
    achievements: "ログイン機能のリファクタリング。",
    challenges: "リダイレクトの仕様を理解するのに時間がかかった。",
    learnings: "Next.jsのMiddlewareの動作について学んだ。",
    next_day_goals: "日報一覧ページに着手する。",
    created_at: "2024-07-19T19:30:00Z",
  },
  {
    id: "report-3",
    user_id: "user-2",
    report_date: "2024-07-20",
    mood: "悪い",
    achievements: "環境構築で1日が終わってしまった。",
    challenges: "Node.jsのバージョン問題。",
    learnings: "nvmを使ったバージョン管理の重要性を再認識した。",
    next_day_goals: "今日こそはコーディングを始める。",
    created_at: "2024-07-20T20:00:00Z",
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

export const getDailyReportsByUserId = async (
  userId: string
): Promise<DailyReport[]> => {
  // For now, we're returning dummy data filtered by userId.
  const reports = dummyReports.filter((report) => report.user_id === userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reports);
    }, 300); // Simulate network latency
  });
};
