import TaskForm from "@/components/tasks/task-form";
import { dummyTasks } from "@/lib/dummy-data";

export default async function EditTaskPage({ params }: any) {
  // ダミーデータからIDに一致するタスクを取得
  const task = dummyTasks.find((task) => task.id === params.id);

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
