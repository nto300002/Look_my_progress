"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Calendar from "@/components/tasks/schedule/calendar";
import { Task } from "@/lib/definitions";

export default function SchedulePage() {
  const params = useParams();
  const userId = params.user_id as string;
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(setTasks);

  useEffect(() => {
    // TODO: fetch tasks for this user
    // e.g., fetchTasksByUserId(userId).then(setTasks);
  }, [userId]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">
            {userId}のスケジュール
          </p>
          <h1 className="text-3xl font-bold">Schedule</h1>
        </div>
      </div>
      <Calendar tasks={tasks} />
    </div>
  );
}
