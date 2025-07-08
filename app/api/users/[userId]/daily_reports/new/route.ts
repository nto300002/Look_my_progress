import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient();
  const { userId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // RLSが有効なため、userIdは認証ユーザーのものと一致する必要があるか、
  // もしくは操作者がtask_managerである必要があります。
  const body = await request.json();

  // フロントエンドのプロパティ名をDBのカラム名に変換
  const { title, mood, achievements, challenges, learnings } = body;
  const reportDataToInsert = {
    title,
    face: mood,
    good_thing: achievements,
    bad_thing: challenges,
    message: learnings,
    user_id: userId,
    report_date: new Date().toISOString(), // report_dateをISO文字列で設定
  };

  const { error } = await supabase
    .from("daily_reports")
    .insert(reportDataToInsert);

  if (error) {
    console.error("Error creating daily report:", error);
    return NextResponse.json(
      { error: "Failed to create daily report" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success" }, { status: 201 });
}
