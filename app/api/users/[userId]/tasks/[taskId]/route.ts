import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  {
    params: paramsPromise,
  }: { params: Promise<{ userId: string; taskId: string }> }
) {
  const params = await paramsPromise;
  const supabase = await createClient();

  // RLS will handle authorization
  const taskData = await request.json();

  const { data, error } = await supabase
    .from("tasks")
    .update(taskData)
    .eq("id", params.taskId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  {
    params: paramsPromise,
  }: { params: Promise<{ userId: string; taskId: string }> }
) {
  const params = await paramsPromise;
  const supabase = await createClient();

  // RLS will handle authorization
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", params.taskId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
