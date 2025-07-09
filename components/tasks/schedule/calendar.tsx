"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/lib/definitions";

// 日付ごとのタスクグループの型
type GroupedTasks = {
  [date: string]: Task[];
};

type CalendarProps = {
  tasks: Task[];
};

export default function Calendar({ tasks }: CalendarProps) {
  const router = useRouter();
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

  useEffect(() => {
    // 1. deadlineが存在するタスクのみをフィルタリング
    const tasksWithdeadline = tasks.filter((task) => task.deadline);

    // 2. deadlineで昇順にソート
    const sortedTasks = tasksWithdeadline.sort(
      (a, b) =>
        new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
    );

    // 3. 日付ごとにグループ化
    const groups = sortedTasks.reduce((acc, task) => {
      const date = task.deadline!; // nullはフィルタリング済み
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {} as GroupedTasks);

    setGroupedTasks(groups);
  }, [tasks]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${year}年${month}月${day}日 (${dayOfWeek})`;
  };

  return (
    <div className="border rounded-lg bg-card text-card-foreground">
      {Object.keys(groupedTasks).length > 0 ? (
        <div className="divide-y">
          {Object.entries(groupedTasks).map(([date, tasksOnDay]) => (
            <div key={date} className="p-4 flex gap-4 items-start">
              <div className="w-1/4 font-semibold text-muted-foreground pt-2">
                {formatDate(date)}
              </div>
              <div className="w-3/4">
                <ul className="space-y-2">
                  {tasksOnDay.map((task) => (
                    <li
                      key={task.id}
                      className={`p-2 rounded-md text-white cursor-pointer ${
                        task.status === "done"
                          ? "bg-green-500 hover:bg-green-600"
                          : task.status === "todo"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-400 hover:bg-gray-500"
                      }`}
                      onClick={() => router.push(`/tasks/${task.id}`)}
                    >
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-4 text-muted-foreground">
          表示するタスクがありません。
        </p>
      )}
    </div>
  );
}
