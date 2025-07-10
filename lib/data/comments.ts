// lib/data/comments.ts
import { createClient } from "@/lib/supabase/server";
import { CommentWithProfile } from "@/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

// 指定された日報IDに紐づく全コメントを取得
export const getCommentsByDailyReportId = async (
  dailyReportId: string
): Promise<CommentWithProfile[]> => {
  noStore(); // 動的レンダリングを強制
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      profiles:user_id (
        name
      )
    `)
    .eq("report_id", dailyReportId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments.");
  }

  return data || [];
};

// 新しいコメントを作成
export const createComment = async (
  dailyReportId: string,
  userId: string,
  content: string
): Promise<CommentWithProfile> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({
      report_id: dailyReportId,
      user_id: userId,
      content,
    })
    .select(`
      *,
      profiles:user_id (
        name
      )
    `)
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment.");
  }

  return data;
};

// コメントを更新
export const updateComment = async (
  commentId: string,
  content: string
): Promise<CommentWithProfile> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .select(`
      *,
      profiles:user_id (
        name
      )
    `)
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    throw new Error("Failed to update comment.");
  }

  return data;
};

// コメントを削除
export const deleteComment = async (commentId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment.");
  }
};

// コメントの所有者を確認
export const isCommentOwner = async (
  commentId: string,
  userId: string
): Promise<boolean> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();

  if (error) {
    console.error("Error checking comment ownership:", error);
    return false;
  }

  return data?.user_id === userId;
};