"use client";

import { useState } from "react";
import { TaskWithTags } from "@/lib/definitions";
import { User } from "@supabase/supabase-js";
import { MasonryLayout } from "@/components/layout/masonry-layout";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskViewToggle } from "@/components/tasks/task-view-toggle";
import TasksTable from "@/components/tasks/tasks-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TasksDisplayProps {
  tasks: TaskWithTags[];
  userId: string;
  authUser: User | null;
  profileName?: string;
}

export function TasksDisplay({ 
  tasks, 
  userId, 
  authUser, 
  profileName 
}: TasksDisplayProps) {
  const [view, setView] = useState<"masonry" | "table">("masonry");

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>タスク一覧</CardTitle>
          <CardDescription>作成されたタスクの一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">まだタスクがありません。</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">タスク一覧</h2>
          <p className="text-sm text-muted-foreground">
            {tasks.length}件のタスク
          </p>
        </div>
        <TaskViewToggle currentView={view} onViewChange={setView} />
      </div>

      {view === "masonry" ? (
        <MasonryLayout>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              userId={userId}
              profileName={profileName}
            />
          ))}
        </MasonryLayout>
      ) : (
        <TasksTable tasks={tasks} userId={userId} authUser={authUser} />
      )}
    </div>
  );
}