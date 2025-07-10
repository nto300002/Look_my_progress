"use client";

import { useState } from "react";
import Link from "next/link";
import { TaskWithTags } from "@/lib/definitions";
import { User } from "@supabase/supabase-js";
import { TagList } from "@/components/tags/tag-list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const priorityMap: {
  [key: string]: { label: string; className: string };
} = {
  big: { label: "大", className: "bg-red-500" },
  medium: { label: "中", className: "bg-yellow-500" },
  small: { label: "小", className: "bg-green-500" },
};

export default function TasksTable({
  tasks: initialTasks,
  userId,
  authUser,
}: {
  tasks: TaskWithTags[];
  userId: string;
  authUser: User | null;
}) {
  console.log("[TasksTable] received userId:", userId);
  const [tasks, setTasks] = useState<TaskWithTags[]>(initialTasks);

  if (!userId) {
    return null; // or a loading indicator
  }

  const handleDelete = async (taskId: string) => {
    // Optimistic UI update
    setTasks(tasks.filter((task) => task.id !== taskId));

    const response = await fetch(`/api/users/${userId}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      // Revert if API call fails
      setTasks(initialTasks);
      // TODO: Show an error message to the user
      console.error("Failed to delete task");
    }
  };

  const handleStatusChange = async (
    taskId: string,
    checked: boolean | "indeterminate"
  ) => {
    const newStatus = checked ? "done" : "todo";
    const originalTasks = [...tasks];

    // Optimistic UI update
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const response = await fetch(`/api/users/${userId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      // Revert if API call fails
      setTasks(originalTasks);
      // TODO: Show an error message to the user
      console.error("Failed to update task status");
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>タスク名</TableHead>
            <TableHead>タグ</TableHead>
            <TableHead>詳細</TableHead>
            <TableHead className="w-[100px]">優先度</TableHead>
            <TableHead className="w-[150px]">期限日</TableHead>
            <TableHead className="w-[150px]">ステータス</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {authUser?.id === task.user_id && (
                  <Checkbox
                    checked={task.status === "done"}
                    onCheckedChange={(checked) =>
                      handleStatusChange(task.id, checked)
                    }
                  />
                )}
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/users/${userId}/tasks/${task.id}`}>
                  {task.title}
                </Link>
              </TableCell>
              <TableCell>
                <TagList tags={task.tags || []} />
              </TableCell>
              <TableCell>
                {task.detail?.substring(0, 30)}
                {task.detail && task.detail.length > 30 ? "..." : ""}
              </TableCell>
              <TableCell>
                <Badge className={priorityMap[task.priority]?.className}>
                  {priorityMap[task.priority]?.label}
                </Badge>
              </TableCell>
              <TableCell>
                {task.deadline ? task.deadline.split("T")[0] : "N/A"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={task.status === "done" ? "default" : "secondary"}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                {authUser?.id === task.user_id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/users/${userId}/tasks/${task.id}/edit`}>
                          編集
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(task.id)}
                      >
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
