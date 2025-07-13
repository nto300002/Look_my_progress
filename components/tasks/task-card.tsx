"use client";

import Link from "next/link";
import { TaskWithTags } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { TagList } from "@/components/tags/tag-list";
import { Markdown } from "@/components/ui/markdown";

interface TaskCardProps {
  task: TaskWithTags;
  userId: string;
  profileName?: string;
}

export function TaskCard({ task, userId, profileName }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "big":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "small":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "big":
        return "大";
      case "medium":
        return "中";
      case "small":
        return "小";
      default:
        return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== "done";

  return (
    <Link href={`/users/${userId}/tasks/${task.id}`}>
      <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] break-inside-avoid ${
        isOverdue ? "border-red-300 dark:border-red-700" : ""
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
              {task.title}
            </CardTitle>
            <div className="flex flex-col gap-1 items-end">
              <Badge className={getPriorityColor(task.priority)}>
                {getPriorityLabel(task.priority)}
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status === "done" ? "完了" : "未完了"}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {task.deadline && (
              <div className={`flex items-center gap-1 ${isOverdue ? "text-red-600 dark:text-red-400" : ""}`}>
                <Calendar className="h-4 w-4" />
                {new Date(task.deadline).toLocaleDateString()}
                {isOverdue && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    期限切れ
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(task.created_at).toLocaleDateString()}
            </div>
            
            {profileName && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {profileName}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {task.detail && (
            <div>
              <h4 className="font-medium text-muted-foreground mb-1">詳細</h4>
              <div className="text-sm text-muted-foreground line-clamp-4 overflow-hidden">
                <Markdown className="prose-sm">{task.detail}</Markdown>
              </div>
            </div>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-muted-foreground mb-1">タグ</h4>
              <TagList tags={task.tags} />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}