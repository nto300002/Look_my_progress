"use client";

import Link from "next/link";
import { DailyReport } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

interface ReportCardProps {
  report: DailyReport;
  userId: string;
  profileName?: string;
}

export function ReportCard({ report, userId, profileName }: ReportCardProps) {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "良い":
      case "smile":
        return "😊";
      case "普通":
      case "normal":
        return "😐";
      case "悪い":
      case "sad":
        return "😞";
      default:
        return "😐";
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "良い":
      case "smile":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "普通":
      case "normal":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "悪い":
      case "sad":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Link href={`/users/${userId}/daily_reports/${report.id}`}>
      <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] break-inside-avoid">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {report.title}
            </CardTitle>
            <Badge className={getMoodColor(report.mood)}>
              <span className="mr-1">{getMoodIcon(report.mood)}</span>
              {report.mood}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(report.report_date).toLocaleDateString()}
            </div>
            {profileName && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {profileName}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {report.achievements && (
            <div>
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-1">
                良かったこと
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {report.achievements}
              </p>
            </div>
          )}
          
          {report.challenges && (
            <div>
              <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">
                悪かったこと
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {report.challenges}
              </p>
            </div>
          )}
          
          {report.learnings && (
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                学んだこと
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {report.learnings}
              </p>
            </div>
          )}
          
          {report.next_day_goals && (
            <div>
              <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                明日の目標
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {report.next_day_goals}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}