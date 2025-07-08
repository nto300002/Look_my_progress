"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DeleteButtonProps = {
  userId: string;
  reportId: string;
};

export function DeleteButton({ userId, reportId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("本当にこの日報を削除しますか？")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/users/${userId}/daily_reports/${reportId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("日報の削除に失敗しました。");
      }

      toast.success("日報を削除しました。");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "不明なエラーが発生しました。"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "削除中..." : "削除"}
    </Button>
  );
}
