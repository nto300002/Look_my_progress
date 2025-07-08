"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/dummy-data";
import { Task } from "@/lib/definitions";
import Calendar from "@/components/tasks/schedule/calendar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(user_id);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">スケジュール</h1>
          <p className="text-muted-foreground">
            タスクの期限をカレンダーで確認します。
          </p>
        </div>
      </div>

      <Calendar tasks={tasks} />
    </div>
  );
}
