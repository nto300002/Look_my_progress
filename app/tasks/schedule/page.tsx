"use client";

import { dummyTasks } from "@/lib/dummy-data";
import Calendar from "@/components/tasks/schedule/calendar";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">スケジュール</h1>
        <p className="text-muted-foreground">
          タスクの期限をカレンダーで確認します。
        </p>
      </div>

      <Calendar tasks={dummyTasks} />
    </div>
  );
}
