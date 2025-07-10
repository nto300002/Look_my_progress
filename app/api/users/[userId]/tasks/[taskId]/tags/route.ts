import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { 
  getTagsByTaskId,
  addTagToTask,
  removeTagFromTask
} from "@/lib/data/taskTags";
import { createTag } from "@/lib/data/tags";

// タスクに紐づくタグ一覧を取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; taskId: string }> }
) {
  try {
    const supabase = await createClient();
    const { userId, taskId } = await params;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ユーザーIDの確認
    if (user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // タスクの所有者確認
    const { data: task } = await supabase
      .from("tasks")
      .select("user_id")
      .eq("id", taskId)
      .single();

    if (!task || task.user_id !== userId) {
      return NextResponse.json({ error: "Task not found or access denied" }, { status: 404 });
    }

    const tags = await getTagsByTaskId(taskId);
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching task tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch task tags" },
      { status: 500 }
    );
  }
}

// タスクにタグを追加
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; taskId: string }> }
) {
  try {
    const supabase = await createClient();
    const { userId, taskId } = await params;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ユーザーIDの確認
    if (user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // タスクの所有者確認
    const { data: task } = await supabase
      .from("tasks")
      .select("user_id")
      .eq("id", taskId)
      .single();

    if (!task || task.user_id !== userId) {
      return NextResponse.json({ error: "Task not found or access denied" }, { status: 404 });
    }

    const { tagId, tagName } = await request.json();

    let finalTagId = tagId;

    // 新しいタグを作成する場合
    if (!tagId && tagName) {
      const newTag = await createTag(tagName, userId);
      finalTagId = newTag.id;
    }

    if (!finalTagId) {
      return NextResponse.json(
        { error: "Tag ID or tag name is required" },
        { status: 400 }
      );
    }

    await addTagToTask(taskId, finalTagId);
    return NextResponse.json({ message: "Tag added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding tag to task:", error);
    return NextResponse.json(
      { error: "Failed to add tag to task" },
      { status: 500 }
    );
  }
}

// タスクからタグを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; taskId: string }> }
) {
  try {
    const supabase = await createClient();
    const { userId, taskId } = await params;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ユーザーIDの確認
    if (user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // タスクの所有者確認
    const { data: task } = await supabase
      .from("tasks")
      .select("user_id")
      .eq("id", taskId)
      .single();

    if (!task || task.user_id !== userId) {
      return NextResponse.json({ error: "Task not found or access denied" }, { status: 404 });
    }

    const { tagId } = await request.json();

    if (!tagId) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 }
      );
    }

    await removeTagFromTask(taskId, tagId);
    return NextResponse.json({ message: "Tag removed successfully" });
  } catch (error) {
    console.error("Error removing tag from task:", error);
    return NextResponse.json(
      { error: "Failed to remove tag from task" },
      { status: 500 }
    );
  }
}