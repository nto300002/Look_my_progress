import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params: paramsPromise }: { params: Promise<{ userId: string }> }
) {
  const params = await paramsPromise;
  const supabase = await createClient();

  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(tasks);
}

export async function POST(
  request: NextRequest,
  { params: paramsPromise }: { params: Promise<{ userId: string }> }
) {
  const params = await paramsPromise;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskData = await request.json();

  // Map frontend data to database schema
  const insertData = {
    title: taskData.title,
    priority: taskData.priority,
    status: taskData.status,
    detail: taskData.detail, // 'detail' from form mapped to 'detail' column
    deadline: taskData.deadline, // 'deadline' from form mapped to 'deadline' column
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
