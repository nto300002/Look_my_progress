"use client";

import { useState } from "react";
import Link from "next/link";
import { Task } from "@/lib/definitions";
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
  高: { label: "高", className: "bg-red-500" },
  中: { label: "中", className: "bg-yellow-500" },
  低: { label: "低", className: "bg-green-500" },
};

export default function TasksTable({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleStatusChange = (
    taskId: string,
    checked: boolean | "indeterminate"
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: checked ? "done" : "todo" }
          : task
      )
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>タスク名</TableHead>
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
                <Checkbox
                  checked={task.status === "done"}
                  onCheckedChange={(checked) =>
                    handleStatusChange(task.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>
              </TableCell>
              <TableCell>
                <Badge className={priorityMap[task.priority]?.className}>
                  {priorityMap[task.priority]?.label}
                </Badge>
              </TableCell>
              <TableCell>{task.dueDate || "N/A"}</TableCell>
              <TableCell>
                <Badge
                  variant={task.status === "done" ? "default" : "secondary"}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/tasks/${task.id}/edit`}>編集</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
