"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Task } from "@/lib/definitions";

type TaskFormProps = {
  userId: string;
  task?: Task;
};

export default function TaskForm({ userId, task }: TaskFormProps) {
  console.log("[TaskForm] received userId:", userId);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskData = Object.fromEntries(formData.entries());

    const url = task
      ? `/api/users/${userId}/tasks/${task.id}`
      : `/api/users/${userId}/tasks`;
    const method = task ? "PATCH" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      router.push(`/users/${userId}/tasks`);
      router.refresh(); // Refresh the page to show the new/updated task
    } else {
      // TODO: Handle errors
      console.error("Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">タスク名</Label>
        <Input
          id="title"
          name="title"
          defaultValue={task?.title}
          placeholder="例: 新機能のUIデザイン"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority">優先度</Label>
          <Select name="priority" defaultValue={task?.priority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="優先度を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="big">大</SelectItem>
              <SelectItem value="medium">中</SelectItem>
              <SelectItem value="small">小</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">期限日</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={task?.deadline?.split("T")[0] || ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">ステータス</Label>
        <Select name="status" defaultValue={task?.status}>
          <SelectTrigger id="status">
            <SelectValue placeholder="ステータスを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">TODO</SelectItem>
            <SelectItem value="done">DONE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="detail">詳細</Label>
        <Textarea
          id="detail"
          name="detail"
          defaultValue={task?.detail ?? ""}
          placeholder="タスクの詳細を記述..."
          rows={10}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          キャンセル
        </Button>
        <Button type="submit">{task ? "更新" : "作成"}</Button>
      </div>
    </form>
  );
}
