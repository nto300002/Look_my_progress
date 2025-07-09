import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTaskById } from "@/lib/data/tasks";
import { createClient } from "@/lib/supabase/server";

const priorityMap: {
  [key: string]: { label: string; className: string };
} = {
  big: { label: "大", className: "bg-red-500" },
  medium: { label: "中", className: "bg-yellow-500" },
  small: { label: "小", className: "bg-green-500" },
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string; user_id: string }>;
}) {
  const { id, user_id } = await params;
  console.log("[TaskDetailPage] received params:", { id, user_id });
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <Link
        href={`/users/${user_id}/tasks`}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        タスク一覧へ戻る
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span>
              優先度:{" "}
              <Badge className={priorityMap[task.priority].className}>
                {priorityMap[task.priority].label}
              </Badge>
            </span>
            <span>
              期限日: {task.deadline ? task.deadline.split("T")[0] : "N/A"}
            </span>
            <span>
              ステータス:{" "}
              <Badge variant={task.status === "done" ? "default" : "secondary"}>
                {task.status}
              </Badge>
            </span>
          </div>
        </div>
        {authUser?.id === task.user_id && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/users/${user_id}/tasks/${task.id}/edit`}>編集</Link>
            </Button>
            <Button variant="destructive">削除</Button>
          </div>
        )}
      </div>

      {task.detail && (
        <div className="max-w-none rounded-md border p-4">
          <h2 className="text-lg font-semibold mb-2">詳細</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {task.detail}
          </p>
        </div>
      )}
    </div>
  );
}
