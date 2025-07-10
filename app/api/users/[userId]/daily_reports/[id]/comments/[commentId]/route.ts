import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { 
  updateComment,
  deleteComment,
  isCommentOwner 
} from "@/lib/data/comments";

// コメント更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; id: string; commentId: string }> }
) {
  try {
    const supabase = await createClient();
    const { commentId } = await params;
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // コメントの所有者かどうか確認
    const isOwner = await isCommentOwner(commentId, user.id);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Forbidden: You can only edit your own comments" },
        { status: 403 }
      );
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required and must be a string" },
        { status: 400 }
      );
    }

    const updatedComment = await updateComment(commentId, content);
    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// コメント削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; id: string; commentId: string }> }
) {
  try {
    const supabase = await createClient();
    const { commentId } = await params;
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // コメントの所有者かどうか確認
    const isOwner = await isCommentOwner(commentId, user.id);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own comments" },
        { status: 403 }
      );
    }

    await deleteComment(commentId);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}