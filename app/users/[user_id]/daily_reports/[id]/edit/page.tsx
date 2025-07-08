import { ReportForm } from "@/components/daily-reports/report-form";
import { getDailyReportById } from "@/lib/data/daily-reports";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string; id: string }>;
}) {
  const { id } = await params;
  const report = await getDailyReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">日報を編集</h1>
      <ReportForm initialData={report} />
    </div>
  );
}
