import { createClient } from "@/lib/supabase/server";
import { Task } from "@/lib/definitions";

export async function getTasksByUserId(userId: string): Promise<Task[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks.");
  }

  return data || [];
}

export async function getTaskById(taskId: string): Promise<Task | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching task:", error);
    throw new Error("Failed to fetch task.");
  }

  return data;
}
