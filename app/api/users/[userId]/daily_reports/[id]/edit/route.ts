import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // フロントエンドのプロパティ名(mood, achievementsなど)をDBのカラム名(face, good_thingなど)に変換
  const { title, mood, achievements, challenges, learnings, report_date } =
    body;

  const reportDataToUpdate: { [key: string]: any } = {};
  if (title !== undefined) reportDataToUpdate.title = title;
  if (mood !== undefined) reportDataToUpdate.face = mood;
  if (achievements !== undefined) reportDataToUpdate.good_thing = achievements;
  if (challenges !== undefined) reportDataToUpdate.bad_thing = challenges;
  if (learnings !== undefined) reportDataToUpdate.message = learnings;
  if (report_date !== undefined) reportDataToUpdate.report_date = report_date;

  // RLSが有効なため、task_managerロールを持つユーザーのみが更新可能
  const { error } = await supabase
    .from("daily_reports")
    .update(reportDataToUpdate)
    .eq("id", id);

  if (error) {
    console.error("Error updating daily report:", error);
    return NextResponse.json(
      { error: `Failed to update daily report: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success" });
}
