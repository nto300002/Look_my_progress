import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TasksTable from "@/components/tasks/tasks-table";
import { PlusCircle } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <p className="text-muted-foreground">チームのタスクを管理します。</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input placeholder="タスクを検索..." />
        </div>
        <Link href="/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      <TasksTable />
    </div>
  );
}
