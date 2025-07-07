import { getAllTasks } from "@/lib/dummy-data";
import TasksTable from "@/components/tasks/tasks-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TasksPage() {
  const tasks = await getAllTasks();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button asChild>
          <Link href="/users/default-user/tasks/new">New Task</Link>
        </Button>
      </div>
      <TasksTable tasks={tasks} />
    </div>
  );
}
