import { createClient } from "@/lib/supabase/server";
import { Tag } from "@/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

// タスクIDに紐づくタグ一覧を取得
export const getTagsByTaskId = async (taskId: string): Promise<Tag[]> => {
  noStore();
  const supabase = await createClient();
  
  // まずタスクの存在を確認
  const { data: taskExists } = await supabase
    .from("tasks")
    .select("id")
    .eq("id", taskId)
    .single();

  // タスクが存在しない場合は空配列を返す
  if (!taskExists) {
    return [];
  }

  const { data, error } = await supabase
    .from("task_tags")
    .select(`
      tags (
        id,
        name,
        user_id,
        created_at,
        updated_at
      )
    `)
    .eq("task_id", taskId);

  if (error) {
    console.error("Error fetching tags by task ID:", error);
    throw new Error("Failed to fetch tags.");
  }

  return (
    data
      ?.flatMap(item => item.tags || [])
    || []
  );
};

// タスクにタグを追加
export const addTagToTask = async (taskId: string, tagId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("task_tags")
    .insert({
      task_id: taskId,
      tag_id: tagId
    });

  if (error) {
    console.error("Error adding tag to task:", error);
    throw new Error("Failed to add tag to task.");
  }
};

// タスクからタグを削除
export const removeTagFromTask = async (taskId: string, tagId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("task_tags")
    .delete()
    .eq("task_id", taskId)
    .eq("tag_id", tagId);

  if (error) {
    console.error("Error removing tag from task:", error);
    throw new Error("Failed to remove tag from task.");
  }
};

// タスクの全タグを削除
export const removeAllTagsFromTask = async (taskId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("task_tags")
    .delete()
    .eq("task_id", taskId);

  if (error) {
    console.error("Error removing all tags from task:", error);
    throw new Error("Failed to remove all tags from task.");
  }
};