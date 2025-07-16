"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteTaskButtonProps = {
  userId: string;
  taskId: string;
};

export function DeleteTaskButton({ userId, taskId }: DeleteTaskButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("本当にこのタスクを削除しますか？")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/users/${userId}/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("タスクの削除に失敗しました。");
      }

      router.push(`/users/${userId}/tasks`);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error instanceof Error ? error.message : "不明なエラーが発生しました。");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-red-600 hover:text-red-700"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "削除中..." : "削除"}
    </Button>
  );
}