import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TasksTable from "@/components/tasks/tasks-table";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Task } from "@/lib/definitions";

export async function TaskContent({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .single();

  // TODO: Fetch tasks for this user
  // const tasks = dummyTasks;
  const tasks: Task[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/users/${userId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {profile?.name ?? "ユーザー"}の詳細へ戻る
          </p>
          <h1 className="text-3xl font-bold">タスク一覧</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input placeholder="タスクを検索..." />
        </div>
        <Link href={`/users/${userId}/tasks/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規作成
          </Button>
        </Link>
      </div>

      <TasksTable tasks={tasks} />
    </div>
  );
}
