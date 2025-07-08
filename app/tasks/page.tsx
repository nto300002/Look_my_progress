import { getTasks } from "@/lib/dummy-data";
import TasksTable from "@/components/tasks/tasks-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">タスク一覧</h1>
          <p className="text-muted-foreground">
            現在進行中のタスクを確認し、管理します。
          </p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">新規タスク作成</Link>
        </Button>
      </div>
      <TasksTable tasks={tasks} />
    </div>
  );
}
