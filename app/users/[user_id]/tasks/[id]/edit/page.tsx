import { getTasks } from "@/lib/dummy-data";
import { Task } from "@/lib/definitions";
import TaskForm from "@/components/tasks/task-form";
import { notFound } from "next/navigation";

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const tasks = await getTasks();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    notFound();
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
