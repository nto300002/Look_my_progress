// import { dummyTasks } from "@/lib/dummy-data";
import { Task } from "@/lib/definitions";
import TaskForm from "@/components/tasks/task-form";

export const dynamic = "force-dynamic";

// 非同期でタスクを取得する関数（Promiseを返す）
async function getTaskById(id: string): Promise<Task | undefined> {
  // TODO: Implement actual data fetching from your database
  // return Promise.resolve(dummyTasks.find((task) => task.id === id));
  return Promise.resolve(undefined);
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
