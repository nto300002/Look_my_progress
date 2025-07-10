import { createClient } from "@/lib/supabase/server";
import { Tag } from "@/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

// 全てのタグを取得（ユーザーIDで制限）
export const getAllTags = async (userId: string): Promise<Tag[]> => {
  noStore();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags.");
  }

  return data || [];
};

// 新しいタグを作成
export const createTag = async (name: string, userId: string): Promise<Tag> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .insert({ name, user_id: userId })
    .select()
    .single();

  if (error) {
    console.error("Error creating tag:", error);
    throw new Error("Failed to create tag.");
  }
  return data;
};

// タグを削除
export const deleteTag = async (tagId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("id", tagId);

  if (error) {
    console.error("Error deleting tag:", error);
    throw new Error("Failed to delete tag.");
  }
};

// タグを更新
export const updateTag = async (tagId: string, name: string): Promise<Tag> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .update({ name })
    .eq("id", tagId)
    .select()
    .single();

  if (error) {
    console.error("Error updating tag:", error);
    throw new Error("Failed to update tag.");
  }

  return data;
};