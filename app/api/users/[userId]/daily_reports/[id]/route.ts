import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

  // RLSが有効なため、task_managerロールを持つユーザーのみが削除可能
  const { error } = await supabase.from("daily_reports").delete().eq("id", id);

  if (error) {
    console.error("Error deleting daily report:", error);
    return NextResponse.json(
      { error: "Failed to delete daily report" },
      { status: 500 }
    );
  }

  return new NextResponse(null, { status: 204 }); // No Content
}
