import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DailyReport } from "@/lib/definitions";
import { getDailyReportsByUserId } from "@/lib/dummy-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const moodMap: { [key: string]: { label: string; className: string } } = {
  良い: { label: "😊 良い", className: "bg-green-100 text-green-800" },
  普通: { label: "😐 普通", className: "bg-yellow-100 text-yellow-800" },
  悪い: { label: "😥 悪い", className: "bg-red-100 text-red-800" },
};

export async function ReportContent({ userId }: { userId: string }) {
  const supabase = await createClient();

  // Fetch daily reports using the dummy data function
  const dailyReports = await getDailyReportsByUserId(userId);

  const { data: profile } = await supabase
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
              {profile?.name ?? "ユーザー"}の日報一覧
            </p>
            <h1 className="text-3xl font-bold">Daily Reports</h1>
          </div>
        </div>
        <Button asChild>
          <Link href={`/users/${userId}/daily_reports/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            日報を新規作成
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>日報履歴</CardTitle>
          <CardDescription>過去に作成した日報の一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>気分</TableHead>
                <TableHead>達成したこと</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyReports.length > 0 ? (
                dailyReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.report_date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={moodMap[report.mood]?.className}
                      >
                        {moodMap[report.mood]?.label ?? report.mood}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {report.achievements?.substring(0, 50)}...
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/users/${userId}/daily_reports/${report.id}`}
                        >
                          詳細を見る
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    まだ日報がありません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
