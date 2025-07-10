import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { 
  getCommentsByDailyReportId, 
  createComment 
} from "@/lib/data/comments";

// コメント一覧取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await getCommentsByDailyReportId(id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// コメント新規作成
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required and must be a string" },
        { status: 400 }
      );
    }

    const comment = await createComment(id, user.id, content);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}