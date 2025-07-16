import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { getTaskById } from "@/lib/data/tasks";
import { getTagsByTaskId } from "@/lib/data/taskTags";
import { TagsSection } from "@/components/tags/tags-section";
import { createClient } from "@/lib/supabase/server";
import { Markdown } from "@/components/ui/markdown";
import { DeleteTaskButton } from "@/components/tasks/delete-task-button";

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

  // 現在のユーザーを取得
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === user_id;

  // タグを取得
  const tags = await getTagsByTaskId(id);

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
        {isOwner && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/users/${user_id}/tasks/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                編集
              </Link>
            </Button>
            <DeleteTaskButton userId={user_id} taskId={id} />
          </div>
        )}
      </div>

      {task.detail && (
        <div className="max-w-none rounded-md border p-4">
          <h2 className="text-lg font-semibold mb-4">詳細</h2>
          <Markdown>{task.detail}</Markdown>
        </div>
      )}

      {/* タグセクション */}
      <TagsSection
        taskId={id}
        userId={user_id}
        isOwner={isOwner}
        initialTags={tags}
      />
    </div>
  );
}
