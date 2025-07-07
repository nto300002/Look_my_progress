import { ReportContent } from "@/components/daily-reports/report-content";
import Loading from "./loading";
import { Suspense } from "react";

export default async function DailyReportsPage({
  params,
}: {
  params: { user_id: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <ReportContent userId={params.user_id} />
    </Suspense>
  );
}
