import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ReportForm } from "@/components/daily-reports/report-form";
import { getDailyReportById } from "@/lib/data/daily-reports";
import { createClient } from "@/lib/supabase/server";

export default async function EditDailyReportPage({
  params,
}: {
  params: { user_id: string; id: string };
}) {
  const { user_id, id } = params;

  const [report, supabase] = await Promise.all([
    getDailyReportById(id),
    createClient(),
  ]);

  if (!report) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user_id)
    .single();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/users/${user_id}/daily_reports`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {profile?.name ?? "ユーザー"} の日報を編集
          </p>
          <h1 className="text-3xl font-bold">Edit Daily Report</h1>
        </div>
      </div>
      <ReportForm initialData={report} />
    </div>
  );
}
