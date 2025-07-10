import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllTags } from "@/lib/data/tags";

// 全てのタグを取得（認証ユーザーのもののみ）
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tags = await getAllTags(user.id);
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}