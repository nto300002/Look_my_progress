import TaskForm from "@/components/tasks/task-form";
import { dummyTasks } from "@/lib/dummy-data";

export const dynamic = "force-dynamic";

// 非同期でタスクを取得する関数（Promiseを返す）
async function getTaskById(id: string) {
  // 同期処理をPromiseでラップして非同期の挙動を模倣する
  return dummyTasks.find((task) => task.id === id);
}

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    return <div>タスクが見つかりません</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">タスク編集</h1>
        <p className="text-muted-foreground">タスクの内容を編集します。</p>
      </div>
      <TaskForm task={task} />
    </div>
  );
}
