import { createClient } from "@/lib/supabase/server";
import { Task, TaskWithTags } from "@/lib/definitions";

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

export async function getTasksWithTagsByUserId(userId: string): Promise<TaskWithTags[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      task_tags (
        tags (
          id,
          name,
          user_id,
          created_at,
          updated_at
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks with tags:", error);
    throw new Error("Failed to fetch tasks with tags.");
  }

  // Define TaskTagRelation type if not imported
  type TaskTagRelation = {
    tags: {
      id: string;
      name: string;
      user_id: string;
      created_at: string;
      updated_at: string;
    };
  };

  type SupabaseTaskRow = Omit<TaskWithTags, "tags"> & {
    task_tags?: TaskTagRelation[];
  };

  return (data as SupabaseTaskRow[] | null)?.map(task => {
    const { task_tags, ...taskBase } = task;
    return {
      ...taskBase,
      tags: (task_tags ?? []).map((tt) => tt.tags).filter(Boolean)
    };
  }) || [];
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
