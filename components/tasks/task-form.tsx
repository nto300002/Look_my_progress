"use client";

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
  task?: Task;
};

export default function TaskForm({ task }: TaskFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">タスク名</Label>
        <Input
          id="title"
          defaultValue={task?.title}
          placeholder="例: 新機能のUIデザイン"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="priority">優先度</Label>
          <Select defaultValue={task?.priority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="優先度を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="高">高</SelectItem>
              <SelectItem value="中">中</SelectItem>
              <SelectItem value="低">低</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">期限日</Label>
          {/* DatePickerコンポーネントがshadcn/uiにあると仮定 */}
          <Input id="dueDate" type="date" defaultValue={task?.dueDate || ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">詳細</Label>
        <Textarea
          id="description"
          defaultValue={task?.description}
          placeholder="タスクの詳細をMarkdown形式で記述..."
          rows={10}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">キャンセル</Button>
        <Button>{task ? "更新" : "作成"}</Button>
      </div>
    </div>
  );
}
