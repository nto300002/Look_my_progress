"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CommentWithProfile } from "@/lib/definitions";

type CommentFormProps = {
  dailyReportId: string;
  userId: string;
  onCommentAdded: (newComment: CommentWithProfile) => void;
};

export function CommentForm({ dailyReportId, userId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("コメント内容を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${userId}/daily_reports/${dailyReportId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const newComment = await response.json();
      setContent("");
      toast.success("コメントを投稿しました");
      onCommentAdded(newComment);
    } catch (error) {
      toast.error("コメントの投稿に失敗しました");
      console.error("Error creating comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">コメントを追加</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment">コメント</Label>
            <Textarea
              id="comment"
              placeholder="コメントを入力してください..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "投稿中..." : "コメントを投稿"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}