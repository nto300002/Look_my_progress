import Link from "next/link";
import { dummyTasks } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const priorityMap: {
  [key: string]: { label: string; className: string };
} = {
  高: { label: "高", className: "bg-red-500" },
  中: { label: "中", className: "bg-yellow-500" },
  低: { label: "低", className: "bg-green-500" },
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = dummyTasks.find((task) => task.id === id);

  if (!task) {
    return <div>タスクが見つかりません</div>;
  }

  return (
    <div className="space-y-6">
      <Link
        href="/tasks"
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
            <span>期限日: {task.dueDate || "N/A"}</span>
            <span>
              ステータス:{" "}
              <Badge variant={task.status === "done" ? "default" : "secondary"}>
                {task.status}
              </Badge>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/tasks/${task.id}/edit`}>編集</Link>
          </Button>
          <Button variant="destructive">削除</Button>
        </div>
      </div>

      <div className="max-w-none rounded-md border p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-3xl font-bold underline mt-4 mb-4"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold mt-3 mb-3" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold mt-3 mb-3" {...props} />
            ),
            h4: ({ ...props }) => (
              <h4 className="text-lg font-semibold mt-3 mb-3" {...props} />
            ),
          }}
        >
          {task.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
