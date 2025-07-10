"use client";

import { useState } from "react";
import { CommentWithProfile } from "@/lib/definitions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

type CommentListProps = {
  dailyReportId: string;
  userId: string;
  currentUserId: string;
  comments: CommentWithProfile[];
  onCommentsChange: (comments: CommentWithProfile[]) => void;
};

export function CommentList({ dailyReportId, userId, currentUserId, comments, onCommentsChange }: CommentListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleEditStart = (comment: CommentWithProfile) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleEditSave = async (commentId: string) => {
    if (!editContent.trim()) {
      toast.error("コメント内容を入力してください");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/daily_reports/${dailyReportId}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const updatedComment = await response.json();
      const updatedComments = comments.map(comment => 
        comment.id === commentId ? updatedComment : comment
      );
      onCommentsChange(updatedComments);
      setEditingId(null);
      setEditContent("");
      toast.success("コメントを更新しました");
    } catch (error) {
      toast.error("コメントの更新に失敗しました");
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("このコメントを削除してもよろしいですか？")) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/daily_reports/${dailyReportId}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      const updatedComments = comments.filter(comment => comment.id !== commentId);
      onCommentsChange(updatedComments);
      toast.success("コメントを削除しました");
    } catch (error) {
      toast.error("コメントの削除に失敗しました");
      console.error("Error deleting comment:", error);
    }
  };


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        コメント ({comments.length})
      </h3>
      
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          まだコメントがありません
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-black text-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {new Date(comment.created_at).toLocaleString()} • {comment.profiles?.name || 'Unknown User'}
                  </div>
                  {comment.user_id === currentUserId && (
                    <div className="flex gap-2">
                      {editingId === comment.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditSave(comment.id)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleEditCancel}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditStart(comment)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingId === comment.id ? (
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{comment.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}