"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { dummyTasks } from "@/lib/dummy-data";
import type { Task } from "@/lib/definitions";
import Calendar from "@/components/tasks/schedule/calendar";

// カレンダーの日を表す型
type Day = {
  date: Date;
  isCurrentMonth: boolean;
};

export default function SchedulePage() {
  const router = useRouter();
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const [currentDate, setCurrentDate] = useState(new Date("2025-07-01"));
  const [calendarDays, setCalendarDays] = useState<Day[][]>([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const endDayOfMonth = lastDayOfMonth.getDate();

    const days: Day[] = [];

    // 前月の日付を追加
    for (let i = startDayOfWeek; i > 0; i--) {
      const prevMonthDate = new Date(year, month, 1 - i);
      days.push({ date: prevMonthDate, isCurrentMonth: false });
    }

    // 今月の日付を追加
    for (let i = 1; i <= endDayOfMonth; i++) {
      const currentMonthDate = new Date(year, month, i);
      days.push({ date: currentMonthDate, isCurrentMonth: true });
    }

    // 次月の日付を追加 (42 = 6週間 * 7日)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({ date: nextMonthDate, isCurrentMonth: false });
    }

    // 7日ごとに週でグループ化
    const weeks: Day[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    setCalendarDays(weeks);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getTasksForDay = (day: Date) => {
    return dummyTasks.filter((task) => {
      if (!task.startDate || !task.dueDate) return false;

      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.dueDate);
      // 日付の比較は時間部分をリセットして行う
      const currentDate = new Date(day);
      currentDate.setHours(0, 0, 0, 0);

      return currentDate >= taskStart && currentDate <= taskEnd;
    });
  };

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
