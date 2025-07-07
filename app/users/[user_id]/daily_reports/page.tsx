import { ReportContent } from "@/components/daily-reports/report-content";
import Loading from "./loading";
import { Suspense } from "react";

type Props = {
  params: {
    user_id: string;
  };
};

export default function DailyReportsPage({ params }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ReportContent userId={params.user_id} />
    </Suspense>
  );
}
