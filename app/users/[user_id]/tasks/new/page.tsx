import TaskForm from "@/components/tasks/task-form";

export default async function NewTaskPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">新規タスク作成</h1>
        <p className="text-muted-foreground">
          新しいタスクの詳細を入力してください。
        </p>
      </div>
      <TaskForm userId={user_id} />
    </div>
  );
}
