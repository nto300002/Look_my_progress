import { getTaskById } from "@/lib/data/tasks";
import TaskForm from "@/components/tasks/task-form";
import { notFound } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string; user_id: string }>;
}) {
  const { id, user_id } = await params;
  console.log("[EditTaskPage] received params:", { id, user_id });
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">タスク編集</h1>
        <p className="text-muted-foreground">タスクの内容を編集します。</p>
      </div>
      <TaskForm task={task} userId={user_id} />
    </div>
  );
}
