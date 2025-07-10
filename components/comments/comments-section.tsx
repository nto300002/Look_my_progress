"use client";

import { useEffect, useState, useCallback } from "react";
import { CommentWithProfile } from "@/lib/definitions";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { createClient } from "@/lib/supabase/client";

type CommentsSectionProps = {
  dailyReportId: string;
  userId: string;
};

export function CommentsSection({ dailyReportId, userId }: CommentsSectionProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}/daily_reports/${dailyReportId}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [dailyReportId, userId]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };

    getCurrentUser();
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = useCallback((newComment: CommentWithProfile) => {
    setComments(prevComments => [...prevComments, newComment]);
  }, []);

  const handleCommentsChange = useCallback((updatedComments: CommentWithProfile[]) => {
    setComments(updatedComments);
  }, []);

  if (!currentUserId) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          コメントを投稿するにはログインが必要です
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommentForm 
        dailyReportId={dailyReportId} 
        userId={userId} 
        onCommentAdded={handleCommentAdded}
      />
      <CommentList 
        dailyReportId={dailyReportId} 
        userId={userId} 
        currentUserId={currentUserId}
        comments={comments}
        onCommentsChange={handleCommentsChange}
      />
    </div>
  );
}