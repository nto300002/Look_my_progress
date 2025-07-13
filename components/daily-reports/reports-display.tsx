"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DailyReport } from "@/lib/definitions";
import { MasonryLayout } from "@/components/layout/masonry-layout";
import { ReportCard } from "@/components/daily-reports/report-card";
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
import { DeleteButton } from "./delete-button";
import { ReportViewToggle } from "./report-view-toggle";

const moodMap: { [key: string]: { label: string; className: string } } = {
  良い: { label: "😊 良い", className: "bg-green-100 text-green-800" },
  普通: { label: "😐 普通", className: "bg-yellow-100 text-yellow-800" },
  悪い: { label: "😥 悪い", className: "bg-red-100 text-red-800" },
  smile: { label: "😊 良い", className: "bg-green-100 text-green-800" },
  normal: { label: "😐 普通", className: "bg-yellow-100 text-yellow-800" },
  sad: { label: "😥 悪い", className: "bg-red-100 text-red-800" },
};

interface ReportsDisplayProps {
  dailyReports: DailyReport[];
  userId: string;
  authUserId?: string;
  profileName?: string;
}

export function ReportsDisplay({ 
  dailyReports, 
  userId, 
  authUserId, 
  profileName 
}: ReportsDisplayProps) {
  const [view, setView] = useState<"masonry" | "table">("masonry");

  if (dailyReports.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>日報履歴</CardTitle>
          <CardDescription>過去に作成した日報の一覧です。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">まだ日報がありません。</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">日報履歴</h2>
          <p className="text-sm text-muted-foreground">
            {dailyReports.length}件の日報
          </p>
        </div>
        <ReportViewToggle currentView={view} onViewChange={setView} />
      </div>

      {view === "masonry" ? (
        <MasonryLayout>
          {dailyReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              userId={userId}
              profileName={profileName}
            />
          ))}
        </MasonryLayout>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead>今の気分</TableHead>
                  <TableHead>よかった事</TableHead>
                  <TableHead>悪かった事</TableHead>
                  <TableHead>伝えたい事</TableHead>
                  <TableHead className="text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {new Date(report.report_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={moodMap[report.mood]?.className}
                      >
                        {moodMap[report.mood]?.label ?? report.mood}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {report.achievements?.substring(0, 60)}...
                    </TableCell>
                    <TableCell>
                      {report.challenges?.substring(0, 60)}...
                    </TableCell>
                    <TableCell>
                      {report.learnings?.substring(0, 60)}...
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/users/${userId}/daily_reports/${report.id}`}
                        >
                          詳細
                        </Link>
                      </Button>
                      {authUserId === report.user_id && (
                        <>
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/users/${userId}/daily_reports/${report.id}/edit`}
                            >
                              編集
                            </Link>
                          </Button>
                          <DeleteButton userId={userId} reportId={report.id} />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}