import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ReportForm } from "@/components/daily-reports/report-form";

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/users/${user_id}/daily_reports`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">新規日報作成</p>
          <h1 className="text-3xl font-bold">New Daily Report</h1>
        </div>
      </div>
      <ReportForm />
    </div>
  );
}
