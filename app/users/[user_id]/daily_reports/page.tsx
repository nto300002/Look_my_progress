import { ReportContent } from "@/components/daily-reports/report-content";
import Loading from "./loading";
import { Suspense } from "react";

export default async function DailyReportsPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <ReportContent userId={user_id} />
    </Suspense>
  );
}
