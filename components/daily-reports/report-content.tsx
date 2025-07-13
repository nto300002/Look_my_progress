import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DailyReport } from "@/lib/definitions";
import { getDailyReportsByUserId } from "@/lib/data/daily-reports";
import { ReportsDisplay } from "@/components/daily-reports/reports-display";


export async function ReportContent({ userId }: { userId: string }) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const { data: authProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authUser?.id)
    .single();

  const authUserRole = authProfile?.role;

  // Fetch daily reports using the actual data fetching function
  const dailyReports: DailyReport[] = await getDailyReportsByUserId(userId);

  const { data: pageProfile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .single();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href={`/users/${userId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {pageProfile?.name ?? "ユーザー"}の日報一覧
            </p>
            <h1 className="text-3xl font-bold">Daily Reports</h1>
          </div>
        </div>
        {authUserRole === "task_manager" && authUser?.id === userId && (
          <Button asChild>
            <Link href={`/users/${userId}/daily_reports/new`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              日報を新規作成
            </Link>
          </Button>
        )}
      </div>

      <ReportsDisplay
        dailyReports={dailyReports}
        userId={userId}
        authUserId={authUser?.id}
        profileName={pageProfile?.name}
      />
    </div>
  );
}
